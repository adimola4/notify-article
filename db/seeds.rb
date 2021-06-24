# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Source.create([
    {
        title: 'The New York Times',
        website_url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        description: 'NYT > Top Stories',
        image_url: 'https://static01.nyt.com/images/misc/nytlogo152x23.gif',
    },
    {
        title: 'Ynet',
        website_url: 'http://www.ynet.co.il/Integration/StoryRss2.xml',
        description: 'עדכוני SMS ישירות מחדר החדשות של ynet. שילחו את המילים ''התחל חדשות'' למספר 5335 וקבלו 4 עדכוני SMS ביום. השירות בתשלום. ',
        image_url: 'https://www.ynet.co.il/images/CENTRAL_1024_ynet_logo.png',
    },
    {
        title: 'Walla',
        website_url: 'https://rss.walla.co.il/feed/1?type=main',
        description: 'אתר החדשות הגדול והמרכזי בישראל. מבזקים ועדכוני חדשות 24 שעות ביממה. דיווחים ישירים בוידאו ובטקסט על כל האירועים בארץ ובעולם. פוליטיקה, צבא, חברה, כלכלה, דעות ועוד',
        image_url: 'https://www.walla.co.il/public/assets/logo/logo_new.svg',
    }
])