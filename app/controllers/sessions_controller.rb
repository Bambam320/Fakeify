class SessionsController < ApplicationController
  #rescues exceptions when data is not found or invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # wraps incoming parameters to let Rails see them
  wrap_parameters format: []
  
  # finds a user and authenticates them then returns the user with 201 status code
  # sessions#login
  def create
    this_user = User.find_by!(username: user_params[:username])
    if this_user&.authenticate(user_params[:password])
      session[:user_id] = this_user.id
      user = clear_spotify_information(this_user)
      render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.artist', 'playlists.songs.album'], status: 201
    else
      render json: { errors: ["Username or Password is incorrect"] }, status: :unprocessable_entity
    end
  end
  
  #if the user is logged in, that user will be returned to the front end
  # sessions#me
  def show
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.artist', 'playlists.songs.album'], status: :ok
    else
      render json: {errors: ["Please login to use cookies"]}, status: :unauthorized
    end
  end

  #the user in the sessions will be logged out
  # sessions#logout
  def destroy
    user = User.find(session[:user_id])
    #using update_columns to avoid validations as this stores private token 
    #information from spotify and not the user
    clear_spotify_information(user)
    session[:user_id] = nil
    head :no_content
  end

  #private methods for users_controller
  private 

  # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:username, :password)
  end

  #returns the errors in case the exceptions are raised
  def render_unprocessable_entity_response invalid
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  #returns the errors in case the record isnt found
  def render_not_found_response
    render json: { errors: ["User not found"] }, status: :not_found
  end

  # updates the spootify information in the user model to null upon login in case the user didn't properly logout
  def clear_spotify_information user
    user.update_columns(
      spotify_token: '',
      spotify_refresh_token: '',
      spotify_token_lifetime: '',
      spotify_display_name: '',
      spotify_email: '',
      spotify_id: '',
      spotify_img: '',
      spotify_region: '',
    )
    user
  end

end
