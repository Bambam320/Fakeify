class Song < ApplicationRecord
  #establishes relationship to other models
  belongs_to :playlist
  belongs_to :album, dependent: :destroy
  belongs_to :artist, dependent: :destroy

  validates :spotify_id, uniqueness: { scope: :playlist_id,
    message: ->(object, data) do
      "The song #{object.name}, has already been added to your playlist" 
    end 
  }
  
  # active storage update
  has_one_attached :cover_blob
end
