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
      user_id: user.id,
      name: new_playlist_name,
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8zMzMuLi4pKSkWFhbo6OhVVVVaWlqBgYEwMDAcHBwlJSUnJycgICAXFxcsLCwPDw/z8/PW1tadnZ3Kysqjo6Pw8PC8vLz5+flsbGyMjIzg4OB1dXW5ublRUVFBQUFgYGB5eXmTk5Ourq5GRkbFxcXPz884ODhmZmaGhoaRKD8qAAAEm0lEQVR4nO2diXqbOBRGzeIkEghjsF0veF8Sv/8LDnQmbdoi0JXdT1fMf17A90RoI+jXaAQAAAAAAEhMN0XNeOm6jr/C9Lp+UXkma7I8OZxmA9O8rpSKwuAHYSqTY+G6qudxvWST4A+i+HUgjtNVLP70+96S8Zvr4p7BJoza/RqSy8J1fQ8z0zXgf82oNq4rfJCiWzAIRDp2XeNDjGWPYN2KgdfzxiXsE6zH1IPrKh9grfoFg0DOXddpzSY3EawVve2KHy3zfOtzWrmu1JIiNhMMgtzTKaPqmOp/a0Q/1zZLw17YkExdV2vD1mgg/Rf1zXW1NlSG40zDxMuxJuhdznxBuq7WgrHxSNoQezglXgnd0M+OOE8ohomHK7e18WzYEN1d10vnSDKcrFzXS+fDYOP0k/Dgul46rzTDV9f10iEavriulw4MYcgfGMKQPzCEIX9gCEP+wBCG/IEhDPkDQxjyB4Yw5A8MYcgfGMKQPzCEIX9gCEP+wBCG/IEhDPkDQxjyB4Yw5A8MYcgffwyXi7ENixfKwa5A7Cx/5qGj7tNZWe3jPLaDJFgrWv5MHu+rcmZzQHN5PiiZTIh1ukBMUqkOZ2JjLu6ZIvUj14QqW1NCRE4ydV0ynVSWpn7FO+lgHR/Uxeyc5jb3oPO1E6qZgWBJOt3KDJH3n0Wd+yxY06s4I8QE8KQngWKqvO2DnwjROTOaR1nwJe0K2Si8f0Yb4o7ndEUIeuBLR9zNOHNd3HPItes3WkgAX/TxBTuvFtt6wp1GkBKZwxuleUxv0nVlz0JqlqdD6Yb6jkjL6uCMLllrGLNhgy5H5GUgQ2nz5q7dcOf9qvsTsW83vAzH8P3/2oa09/Cc0fXD4Yyl4Ue74cnDl6Tt6OZDStAhbxLNu+HNQLaH9cr72m44GkwbamN7aRFrfNFNFqPRbCDbp2itMxy9D2POj/V3LpwH0RPFRStITFXliuz618V1ABNG2NWE9crN/+E07775ZOn9c6pOnYL1wob6mQgzUs2i+ws3rxVTk2+rCunvPlGZxaCO956+OBW5cRrxOvaxGZNQt6VoYfMae7bhF0m+pn34VVRS+fBV23dEmr2X9K/3ptsqklIlaWQF9a9j9ytRkigpdyfr+83Gt/P8dH+z4L6nKe7tfmVdnq+uLjjx5xthW2AIQ/7AEIb8gSEM+QNDGPIHhjDkDwxhyB8YwpA/MIQhf2AIQ/7AEIb8gSEM+QNDGPIHhjDkDwxhyB8YwpA/MIQhf2AIQ/7A0H/DA83Q7EgWKyrSsSJdVgdn7qTzttHRdb10SlJSSmqc48wHWlKKOruul05BOvgurY9muWNJasPcdbk2UOLfdMFOvKEMNbpQIN5sCMngmaszhI9hfsbSz4eUkgWjtq5rtWNpelJaCNel2mLaiNLTJhyZ9kQfd06fFEbDaWZ27wZPSoP0sNjfZ7Th2NsVMy8n+y+sehTjvkgg/ty7En1Erg2I94htot3tJ+HNdXVPYVHlbY4ipeatMGbzlqhfJUUkJ6RLttiz/HZM8yYKJk2bvJVc3Al5QN6wuG3n5elUzreFzV13AAAAALDnHycvcJ9qM5dHAAAAAElFTkSuQmCC",
      description: 'My Playlist includes ...',
      spotify_id: '',
      type_of_playlist: 'regular ol\' playlist',
    )
    render json: playlist, status: :created
  end

  # PATCH/PUT /playlists/1
  def update
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
      params.permit(:user_id, :id, :name, :description, :spotify_id, :type_of_playlist, :image)
    end
    
end
