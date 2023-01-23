class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :genres, :image_url, :spotify_id, :followers
  has_many :songs
end
