class ChangeCoverArtToImageUrlInSongs < ActiveRecord::Migration[7.0]
  def change
    rename_column :songs, :cover_art, :image_url
  end
end
