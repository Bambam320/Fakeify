class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.integer :user_id
      t.string :name
      t.string :image
      t.string :description
      t.text :spotify_id
      t.string :type_of_playlist
      t.timestamps
    end
  end
end