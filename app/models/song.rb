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
  # create active storage to save image file here
  # the firs thing to do is to remove image storage as part of an attribute in the models
  # definitely going to start this tomorrow
end
