class Album < ApplicationRecord
  has_many :songs
  belongs_to :artist
  has_many :playlists, through: :songs

  def update_album
    album = RSpotify::Album.find(self.spotify_id)
    self.update!(
      name: album.name,
      release_date: album.release_date,
      spotify_artist_id: album.artists.first.id,
      artist_name: album.artists.first.name,
      total_tracks: album.total_tracks,
      image_url: album.images.first['url'],
      spotify_id: album.id,
    )
  end
end
