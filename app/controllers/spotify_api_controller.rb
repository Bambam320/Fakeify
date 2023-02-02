class SpotifyApiController < ApplicationController

    before_action :update_token
    skip_before_action :update_token, only: [:callback, :search_for_tracks, :browse, :featured_songs]
  
    # searches for tracks based on a search term, returns the songs
    def search_for_tracks
      songs = RSpotify::Track.search("#{params[:search]}", limit: 30)
      render json: songs, status: :ok
    end
  
    # searches each category with the provided search term and returns, 10 each to the front end
    def browse
      results = {}
      results[:artists] = RSpotify::Artist.search("#{params[:term]}", limit: 10)
      results[:tracks] = RSpotify::Track.search("#{params[:term]}", limit: 10)
      results[:albums] = RSpotify::Album.search("#{params[:term]}", limit: 10)
      results[:playlists] = RSpotify::Playlist.search("#{params[:term]}", limit: 10)
      render json: results, status: :ok
    end
  
    # requests the featured playlist from spotify then chooses the next one in numerical succession
    # the playlist has its songs filtered for only the ones that include an audio preview_url
    # then it is sent back as a part of a hash including the basic playlist info
    def featured_songs
      session[:current_featured_playlist] = session[:current_featured_playlist] || 0
      featuredPlaylistLength = RSpotify::Playlist.browse_featured.length
      def return_songs playlist_index
        featuredPlaylist = RSpotify::Playlist.browse_featured[playlist_index]
        unfilteredSongs = featuredPlaylist.tracks
        songs = unfilteredSongs.filter { |song| !song.preview_url.nil? }
        playlist = Hash.new
        playlist[:songs] = songs
        playlist[:playlist_info] = {
          name: featuredPlaylist.name,
          description: featuredPlaylist.description,
        }
        return playlist
      end
      if session[:current_featured_playlist] == featuredPlaylistLength - 1
        playlist = return_songs(session[:current_featured_playlist])
        session[:current_featured_playlist] = 0
        render json: playlist, status: :ok
      elsif session[:current_featured_playlist] > 0 && 
        playlist = return_songs(session[:current_featured_playlist])
        session[:current_featured_playlist] = session[:current_featured_playlist] + 1
        render json: playlist, status: :ok
      elsif session[:current_featured_playlist] == 0
        playlist = return_songs(session[:current_featured_playlist])
        session[:current_featured_playlist] = session[:current_featured_playlist] + 1
        render json: playlist, status: :ok
      else
        render json: { errors: ["An error occured, please try again."] }, status: :not_found
      end
    end

    # sends playlist to spotify users account
    ########## add custom image api and save tracks to playlist
    def new_playlist
      spotify_user = RSpotify::User.new({
        'credentials' => {
          "token" => params[:spotify_token],
          "refresh_token" => params[:spotify_refresh_token],
        },
        'id' => params[:spotify_id]
      })
      new_playlist = spotify_user.create_playlist!(params[:playlists][:name])
      filled_playlist = new_playlist.add_tracks!()
      byebug

#add_tracks!(tracks, position: nil) ⇒ Array<Track>

      tracks = RSpotify::Track.search('Know', 30)
      playlist = user.create_playlist!('my-awesome-playlist')
      
      playlist.add_tracks!(tracks)
      playlist.tracks.size       #=> 30
      playlist.tracks.first.name #=> "Somebody That I Used To Know"
      
      playlist.add_tracks!(tracks, position: 20)
      playlist.tracks[20].name #=> "Somebody That I Used To Know"

      #replace_image!(image, content_type) ⇒ NilClass

      url = "https://api.spotify.com/v1/users/user_id/playlists"
      request_data = {
        name: "the playlist",
        public: true,
        description: "the description of the playlist",
        collaborative: false
      }.to_json
      response = RSpotify::User.oauth_post(params[:spotify_id], url, request_data)
      return response if RSpotify.raw_response
      Playlist.new response
      byebug
    end

    # receives valid callback from spotify and saves the spotify users information into the local users record then redirects to the profile page in the front end
    def callback
      spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
      current_user = User.find(session[:user_id])
      current_user.update_columns(
        spotify_token: spotify_user.credentials.token,
        spotify_refresh_token: spotify_user.credentials.refresh_token,
        spotify_token_lifetime: spotify_user.credentials.expires_at,
        spotify_display_name: spotify_user.display_name,
        spotify_email: spotify_user.email,
        spotify_id: spotify_user.id,
        spotify_img: spotify_user.images.length > 0 ? spotify_user.images[0].url : '',
        spotify_region: spotify_user.country,
      )
      redirect_to "http://localhost:4000/profile"
    end
  
    private
  
    # automatically updates the token and associated info if the logged in users token expired
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
  
  