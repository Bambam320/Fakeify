class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.integer :album_id
      t.integer :playlist_id
      t.integer :artist_id
      t.string :featured_artist
      t.text :release_date
      t.string :name
      t.text :duration
      t.string :genre
      t.timestamps
    end
  end
end