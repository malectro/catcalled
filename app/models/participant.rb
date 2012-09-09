class Participant
  include Mongoid::Document

  field :fname, as: :first_name, type: String
  field :lname, as: :last_name, type: String
  field :name, type: String
  field :age, type: Integer
  field :race, type: String
  field :hood, type: String
  field :sex, type: String

  field :active, type: Boolean

  has_one :bio

end
