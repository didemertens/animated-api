const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Film = require('../models/film')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'dide',
          email: 'dide@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          username: 'roan',
          email: 'roan@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then((createdUsers) => {
      console.log(`${createdUsers.length} users created`)
      return Film.create([
        {
          title: 'Kiki\'s Delivery Service',
          director: 'Hayao Miyazaki',
          releaseYear: 1989,
          image: 'https://images-na.ssl-images-amazon.com/images/I/61IUCRK4t6L._SY445_.jpg',
          longDescription: 'Kiki\’s Delivery Service follows the fun filled escapades and new friendships of a young trainee witch, Kiki who must leave her family on the night of a full moon to learn her craft. With her chatty black cat, Jiji, she flies off to find the perfect spot in a faraway city where she must live for a whole year by using her magical powers. But Kiki is poor with potions and second-rate at spells. She befriends a bakery owner and instead, Kiki sets up a courier service, using her broomstick to deliver everything from pies to pets. At first with only her sarcastic cat for company, she soon discovers that she has more friends than she ever thought possible.',
          description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.',
          user: createdUsers[0]
        },
        {
          title: 'Ruben Brandt, Collector',
          director: 'Milorad Krstić',
          releaseYear: 2018,
          image: 'https://images.flickdirect.com/cache/movies/ruben-brandt-collector/03840-ruben-brandt-collector-poster.jpg',
          longDescription: 'Ruben Brandt, a famous psychotherapist, is forced to steal 13 paintings from the world\'s renowned museums and private collections to prevent his suffering from terrible nightmares he has as a result of subliminal messaging he received as a child. Accompanied by his four patients, he and his band of thieves strike regularly and with great success: the Louvre, Tate, Uffizi, Hermitage, the Museum of Modern Art. \'The Collector\' quickly becomes the most wanted criminal in the world. Gangsters and headhunters chase him around the world while the reward for his capture keeps rising, approaching a hundred million dollars. A cartel of insurance companies entrusts Mike Kowalski, a private detective and leading expert on art theft, to solve the Collector Case.',
          description: 'Four expert thieves attempt to steal every famous artwork that is haunting their mutual psychotherapist. A detective attempts to find out who the "Collector" is.',
          user: createdUsers[1]
        },
        {
          title: 'Mirai',
          director: 'Mamoru Hosoda',
          releaseYear: 2018,
          image: 'https://cdn.eventcinemas.com.au/cdn/resources/movies/12629/images/largeposter.jpg',
          longDescription: 'The birth of a sibling is a joyous time for many, but not for Kun. Four years old and spoilt rotten, he sees the arrival of baby sister Mirai as competition for his parents\' love. That is, until magical encounters with an older Mirai and family past, present and future send the siblings on an intimate journey through time and space, to confront Kun;s uncertain feelings and prepare him to become the big brother he needs to be.',
          description: 'A young boy encounters a magical garden which enables him to travel through time and meet his relatives from different eras, with guidance by his younger sister from the future.',
          user: createdUsers[1]
        },
        {
          title: 'Persepolis',
          director: 'Marjane Satrapi',
          releaseYear: 2007,
          image: 'https://i1.wp.com/www.sparehed.com/wp-content/uploads/2007/10/persepolis-poster-1.jpg',
          longDescription: 'Based upon the graphic novels of Marjane Satrapi, Persepolis is the biographical story following the poignant and often hilarious adventures of Marji. From a rebellious, heavy metal loving tomboy experiencing the turmoil of adolescence during the tyrannical, Iranian revolution to a teenage exile in Vienna, Austria, where she discovers the benefits of freedom can be just as shocking as the repressive regime she was forced to leave behind. Returning to Iran as an alienated adult, Marji must now decide where it is her heart and her home must lay in this complex, insightful, honest and touching story, making Persepolis one of the most sublime animated feature films you’re likely to experience.',
          description: 'A precocious and outspoken Iranian girl grows up during the Islamic Revolution.',
          user: createdUsers[0]
        },
        {
          title: 'Ponyo',
          director: 'Hayao Miyazaki',
          releaseYear: 2008,
          image: 'https://musicart.xboxlive.com/7/ad355100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
          longDescription: 'Animated adventure by the Japanese anime studio Studio Ghibli, written and directed by Hayao Miyazaki and loosely based on Hans Christian Andersen\'s story The Little Mermaid. When a feisty baby goldfish/mermaid called Ponyo runs away from her home in the sea, she ends up stranded on the shore and is rescued by Sosuke, a human boy who lives on a nearby clifftop. Ponyo yearns to become human herself so that she can be with Sosuke, but many obstacles stand in her way.',
          description: 'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.',
          user: createdUsers[0]
        },
        {
          title: 'The Red Turtle',
          director: 'Michaël Dudok de Wit',
          releaseYear: 2016,
          image: 'https://upload.wikimedia.org/wikipedia/en/f/fe/The_Red_Turtle.png',
          longDescription: 'The Red Turtle is a 2016 animated fantasy drama film co-written and directed by Dutch animator Michaël Dudok de Wit and produced by Toshio Suzuki from Japan. The film is a co-production between Wild Bunch and Studio Ghibli, and tells the story of a man who becomes shipwrecked on a deserted island and meets a giant red female turtle. The film has no dialogue.',
          description: 'A man is shipwrecked on a deserted island and encounters a red turtle, which changes his life.',
          user: createdUsers[0]
        },
        {
          title: 'My Neighbour Totoro',
          director: 'Hayao Miyazaki',
          releaseYear: 1988,
          image: 'https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-12561-yutq1u_10dca429.jpeg?region=0%2C0%2C1000%2C1328',
          longDescription: 'While their mother recovers from an illness, Satsuki and her little sister Mei (voiced in English by Dakota Fanning and Elle Fanning) get away from it all in an idyllic rural retreat. Far from the bustle of the city, they discover a mysterious place of spirits and magic, and the friendship of the Totoro woodland creatures. Conceived as a family film devoid of conflict and suffused with the joy of country living, My Neighbour Totoro is a masterpiece for the whole family. It unites the unique vision of Hayao Miyazaki with a feel-good tale of childlike wonder and true originality. A universal classic for all generations, My Neighbour Totoro shows Japanese animation’s famous Studio Ghibli at its very best, and is an elegy to two ever-fading miracles: the fairytale world of childhood and the disappearing countryside.',
          description: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.',
          user: createdUsers[1]
        },
        {
          title: 'The Hobbit',
          director: 'Arthur Rankin Jr',
          releaseYear: 1977,
          image: 'https://vignette.wikia.nocookie.net/lotr/images/f/f2/The_Hobbit_DVD_cover.jpg/revision/latest/top-crop/width/360/height/450?cb=200603141451578',
          longDescription: 'The Hobbit is a 1977 Japanese-American animated musical television special created by Rankin/Bass, a studio known for their holiday specials, and animated by Topcraft, a precursor to Studio Ghibli. The film is an adaptation of the 1937 book of the same name by J. R. R. Tolkien. Bilbo Baggins lives a simple life with his fellow hobbits in the shire, until the wizard Gandalf arrives and convinces him to join a group of dwarves on a quest to reclaim the kingdom of Erebor. The journey takes Bilbo on a path through treacherous lands swarming with orcs, goblins and other dangers, not the least of which is an encounter with Gollum and a simple gold ring that is tied to the fate of Middle Earth in ways Bilbo cannot even fathom.',
          description: 'A homebody hobbit in Middle Earth gets talked into joining a quest with a group of dwarves to recover their treasure from a dragon.',
          user: createdUsers[1]
        }
      ])
    })
    .then(createdFilms => console.log(`${createdFilms.length} films created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})