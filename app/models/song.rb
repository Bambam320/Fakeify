class Song < ApplicationRecord
  #establishes relationship to other models
  belongs_to :playlist
  belongs_to :album
  belongs_to :artist
end
