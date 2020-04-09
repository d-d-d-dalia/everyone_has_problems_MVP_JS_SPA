class AddProblemsAssociationToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :problems, :user
  end
end