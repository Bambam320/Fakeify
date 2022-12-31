class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.integer :artist_id
      t.string :name
      t.string :artist
      t.text :release_date
      t.integer :song_count
      t.string :cover
      t.string :genre
      t.timestamps
    end
  end
end