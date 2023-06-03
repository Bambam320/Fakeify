class SpotifyApiController < ApplicationController

    # searches for tracks based on a search term, returns the songs
    def search_for_tracks
      if params[:search] != 'blank'
      songs = RSpotify::Track.search("#{params[:search]}", limit: 30)
      render json: songs, status: :ok
      else
        render json: {error: ["No search term provided"]}, status: :not_found
      end
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
        # byebug
        playlist[:playlist_info] = {
          name: featuredPlaylist.name,
          description: featuredPlaylist.description,
          image_url: featuredPlaylist.images[0]['url']
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
      song_id_array = params[:playlists][:songs].map{|song| song[:spotify_id]}.filter{|id| !id.nil?}
      song_uri_array = RSpotify::Track.find(song_id_array).map{|song| song.uri }
      if filled_playlist = new_playlist.add_tracks!(song_uri_array) 
        render json: {message: "#{params[:playlists][:name]} has been succesfully added to your spotify account, #{params[:spotify_display_name]}"}, status: :created
      else 
        render json: {error: "A failure has occured while adding playlist #{params[:playlists][:name]}, please try again!"}, status: :bad_request
      end
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
  
    # updates the token and associated info for the user
    def update_token
      @user = User.find(session[:user_id])
      body = {
        grant_type: "refresh_token",
        refresh_token: @user.spotify_refresh_token,
        client_id: Rails.application.credentials.spotify.client_id,
        client_secret: Rails.application.credentials.spotify.client_secret
      }
      spotify_response = RestClient.post('https://accounts.spotify.com/api/token', body)
      spotify_auth_params = JSON.parse(spotify_response)
      @user.update_columns(
        spotify_token: spotify_auth_params["access_token"],
        spotify_token_lifetime: @user.spotify_token_lifetime + spotify_auth_params["expires_in"]
      )
      render json: @user, include: ['playlists', 'playlists.songs', 'playlists.songs.artist', 'playlists.songs.album'], status: :ok
    end
  end
  
  # (Time.at(currentUser.spotify_token_lifetime).to_datetime.to_f - Time.now.to_f).negative?()