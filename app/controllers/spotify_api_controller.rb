class SpotifyApiController < ApplicationController

    before_action :update_token
    skip_before_action :update_token, only: [:callback, :search_for_tracks, :browse]
  
    def search_for_tracks
      songs = RSpotify::Track.search("#{params[:search]}", limit: 30)
      render json: songs, status: :ok
    end
  
    def browse
      results = {}
      results[:artists] = RSpotify::Artist.search("#{params[:term]}", limit: 10)
      results[:tracks] = RSpotify::Track.search("#{params[:term]}", limit: 10)
      results[:albums] = RSpotify::Album.search("#{params[:term]}", limit: 10)
      results[:playlists] = RSpotify::Playlist.search("#{params[:term]}", limit: 10)
      render json: results, status: :ok
    end
  
    def callback
      spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
      current_user = User.find(session[:user_id])
      current_user.update!(
        spotify_token: spotify_user.credentials.token,
        spotify_refresh_token: spotify_user.credentials.refresh_token,
        spotify_token_lifetime: spotify_user.credentials.expires_at,
        spotify_display_name: spotify_user.display_name,
        spotify_email: spotify_user.email,
        spotify_id: spotify_user.id,
        spotify_img: spotify_user.images.length > 0 ? spotify_user.images[0] : '',
        birthdate: spotify_user.birthdate,
        region: spotify_user.country,
      )
      redirect_to "http://localhost:4000/profile"
    end
  
    private
  
    def update_token
      currentUser = User.find(session[:user_id])
      if (Time.at(currentUser.spotify_token_lifetime).to_datetime.to_f - Time.now.to_f).negative?() {
        body = {
          grant_type: "refresh_token",
          refresh_token: currentUser.spotify_refresh_token,
          client_id: Rails.application.credentials.spotify.client_id,
          client_secret: Rails.application.credentials.spotify.client_secret
        }
        spotify_response = RestClient.post('https://accounts.spotify.com/api/token', body)
        spotify_auth_params = JSON.parse(spotify_reponse)
        currentUser.update!(
          spotify_token: spotify_auth_params.access_token,
          spotify_token_lifetime: currentUser.spotify_token_lifetime + spotify_auth_params.expires_in
        )
      } 
      end
    end
  
  end
  
  