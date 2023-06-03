class ChangeImageToImageUrlInPlaylists < ActiveRecord::Migration[7.0]
  def change
    rename_column :playlists, :image, :image_url
  end
end
