class SongSerializer < ActiveModel::Serializer
  # active storage update
  attributes :cover_blob, :preview_url, :id, :album_id, :playlist_id, :artist_id, :featured_artist, :release_date, :name, :genre, :spotify_playlist_id, :spotify_album_id, :spotify_artist_id, :cover_art, :spotify_id
  belongs_to :playlist
  belongs_to :artist
  belongs_to :album
end
