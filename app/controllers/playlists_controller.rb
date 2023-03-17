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
    byebug
    playlist = user.playlists.create!(
      user_id: user.id,
      name: new_playlist_name,
      cover_blob: playlist_params[:cover_blob],
      description: 'My Playlist includes ...',
      spotify_id: '',
      type_of_playlist: 'regular ol\' playlist',
    )
    render json: playlist, status: :created
  end

  # PATCH/PUT /playlists/1
  def update
    byebug
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
      params.permit(:cover_blob, :user_id, :id, :name, :description, :spotify_id, :type_of_playlist, :image)
    end
    
end
