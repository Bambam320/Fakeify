class Song < ApplicationRecord
  #establishes relationship to other models
  belongs_to :playlist
  belongs_to :album, dependent: :destroy
  belongs_to :artist, dependent: :destroy
end
