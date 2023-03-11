class Playlist < ApplicationRecord
  #establishes relationship to other models
  belongs_to :user
  has_many :songs, dependent: :destroy
  has_many :artists, through: :songs
  has_many :albums, through: :songs

  # active storage update
  has_one_attached :cover_blob
end
