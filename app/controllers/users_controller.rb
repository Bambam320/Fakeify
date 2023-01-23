class UsersController < ApplicationController
  #rescues exceptions when data is not found or invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # wraps incoming parameters to let Rails see them
  wrap_parameters format: []

  # signs up a new user to to login with spotify
  # Users#Signup
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.artist'], status: :created
  end

  #private methods for users_controller
  private 

  # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:username, :password, :password_confirmation, :avatar_url)
  end

  #returns the errors in case the exceptions are raised
  def render_unprocessable_entity_response invalid
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  #returns the errors in case the record isnt found
  def render_not_found_response
    render json: { errors: ["User not found"] }, status: :not_found
  end

end
