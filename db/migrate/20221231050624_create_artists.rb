class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|
      t.string :name
      t.string :genres
      t.string :image_url
      t.string :spotify_id
      t.integer :followers
      t.timestamps
    end
  end
end