class Bio
  include Mongoid::Document

  QUESTIONS = [
    'How would you describe the street harassment situation in your neighborhood?',
    'What has been your experience with sexual harassment to date?',
    'Can you remember the first time you felt unsafe in your environment due to catcalling?',
    'What do you think is specific to the New York experience of street harassment?',
    'Have you ever found catcalling flattering?',
    'Is there anything else you think your audience should know about your past experiences?'
  ]

  belongs_to :participant

  field :answers, type: Array, default: Array.new(QUESTIONS.length, '')

end
