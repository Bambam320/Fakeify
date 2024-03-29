class PlaylistsController < ApplicationController
  #rescues exceptions when data is not found or invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # wraps incoming parameters to let Rails see them
  wrap_parameters format: []
  
  # before_action :set_playlist, only: %i[ show update destroy ]

  # GET /playlists
  def index
    @playlists = Playlist.all

    render json: @playlists
  end

  # GET /playlists/:id
  def show
    # byebug
    playlist = Playlist.find(params[:id])
    render json: playlist, status: :ok
  end

  # POST /playlists
  def create
    user = User.find(session[:user_id])
    new_playlist_name = user.playlists.length < 1 ? "My Playlist #1" : "My Playlist ##{user.playlists.last.id + 1}"
    playlist = user.playlists.create!(
      name: new_playlist_name,
      description: 'My Playlist includes ...',
      spotify_id: '',
      type_of_playlist: 'regular ol\' playlist',
    )
    playlist.blob.attach(file: params[:cover_blob])
    render json: playlist, status: :created
  end  

  # playlist.cover_blob.attach(io: File.open('/path/to/file'), filename: 'my_picture.png')
  # need to add the local host address to the url helper
  # PATCH/PUT /playlists/1
  # Finish the update for active storage and bring back oauth for the hosted version
  #check this against the other repo to determine where the attribute got lost from the songs table
  def update
    byebug
    #attach blob from local storage here
    playlist = Playlist.find(params[:id])
    playlist.update!(playlist_params)
    render json: playlist, status: :ok
  end

  # DELETE /playlists/1
  def destroy
    Playlist.find(params[:id]).destroy
    render json: {}, status: :ok
  end

  private

    #returns the errors in case the exceptions are raised
    def render_unprocessable_entity_response invalid
      render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    #returns the errors in case the record isnt found
    def render_not_found_response
      render json: { error: ["User not found"] }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def playlist_params
      params.permit(:user_id, :id, :name, :description, :spotify_id, :type_of_playlist, :image_url)
    end
    
end
