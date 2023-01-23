class Artist < ApplicationRecord
  has_many :songs
  has_many :albums
  has_many :playlists, through: :songs

  def update_artist
    artist = RSpotify::Artist.find(self.spotify_id)
    self.update!(
      name: artist.name,
      genres: artist.genres,
      image_url: artist.images.first['url'],
      followers: artist.followers['total']
    )
  end
end
