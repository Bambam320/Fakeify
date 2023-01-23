class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :artist_id, :name, :release_date, :spotify_artist_id, :artist_name, :total_tracks, :image_url, :spotify_id
end
