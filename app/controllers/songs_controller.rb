class SongsController < ApplicationController
  #rescues exceptions when data is not found or invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # wraps incoming parameters to let Rails see them
  wrap_parameters format: []

# GET /songs
def index
  @songs = Song.all

  render json: @songs
end

# GET /songs/1
def show
  render json: @song
end

# POST /songs
def create
  playlist = Playlist.find(song_params[:playlist_id])
  artist = Artist.find_or_create_by(spotify_id: song_params[:spotify_artist_id])
  artist.update_artist
  album = Album.find_or_create_by(
    spotify_id: song_params[:spotify_album_id],
    artist_id: artist.id
  )
  album.update_album
  updated_song_params = song_params.clone
  updated_song_params["artist_id"] = artist.id
  updated_song_params["album_id"] = album.id
  song = playlist.songs.create!(updated_song_params)
  render json: song, status: :created
end

# PATCH/PUT /songs/1
def update
  if @song.update(song_params)
    render json: @song
  else
    render json: @song.errors, status: :unprocessable_entity
  end
end

# DELETE /songs/1
def destroy
  song = Song.find(params[:id]).destroy
  render json: {}, status: :accepted
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
  def song_params
    params.permit(:cover_art, :preview_url, :playlist_id, :name, :preview_url, :spotify_album_id, :spotify_playlist_id, :spotify_artist_id, :featured_artist, :release_date, :genre)
  end

end

