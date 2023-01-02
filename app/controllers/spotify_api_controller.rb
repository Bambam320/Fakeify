class SpotifyApiController < ApplicationController

  REDIRECT_URI = 'http://localhost:3000/callback'

  def connect
      client_id = Rails.application.credentials.spotify[:client_id]
      response_type = 'code'
      scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state'
      url = "https://accounts.spotify.com/authorize?client_id=#{client_id}&redirect_uri=#{REDIRECT_URI}&scope=#{scope}&response_type=#{response_type}"
      render json: { url: url }, status: :ok
  end

  def get_user_token
      render json: { token: current_user.access_token }, status: :ok
  end

  def callback
      current_user = User.first
      code = params[:code]
      response = SpotifyApi::Client.get_user_access_token(code: code, redirect_uri: REDIRECT_URI)
      access_token = response['access_token']
      expires_at = Time.current + response['expires_in'].seconds
      refresh_token = response['refresh_token']

      current_user.update(access_token: access_token, expires_at: expires_at, refresh_token: refresh_token)
      redirect_to "http://localhost:4000/success"
  end

  def search 
      results = SpotifyApi::Client.search_track(params[:track_name])
      
      first_track = results.dig('tracks', 'items', 0)
      
      audio_analysis_for_first_track = SpotifyApi::Client.audio_analysis(first_track.dig('id'))
      
      first_track['audio_analysis'] = audio_analysis_for_first_track.dig('track')

      get_artist_for_first_track = SpotifyApi::Client.get_artist(first_track.dig('artists', 0, 'id'))

      first_track['genres'] = get_artist_for_first_track.dig('genres')

      render json: first_track, status: :ok
  end

  def audio_analysis 
      results = SpotifyApi::Client.audio_analysis(params[:id])
      render json: results, status: :ok
  end

  def recommendations
      results = SpotifyApi::Client.get_recommendations(params[:id], params[:tempo], params[:key], params[:mode]).dig('tracks')

      ids = results.map do |track| 
          track.dig('id') 
      end

      audio_features_for_results = SpotifyApi::Client.audio_features(ids.join(",")).dig('audio_features')

      results.each do |track| 
          track['audio_features'] = audio_features_for_results.find do |features|
              features.dig('id') == track.dig('id')
          end
      end

      render json: results, status: :ok
  end
end


