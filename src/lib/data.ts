
export interface University {
  id: string;
  name: string;
  location: {
    country: string;
    city: string;
  };
  programs: string[];
  tuition: {
    currency: string;
    undergraduate: number;
    graduate: number;
  };
  ranking: number;
  applicationDeadlines: {
    fall: string;
    spring: string;
  };
  acceptanceRate: number;
  scholarshipsAvailable: boolean;
  imageUrl: string;
  description: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'passport' | 'transcript' | 'diploma' | 'testScore' | 'cv' | 'letterOfRecommendation' | 'personalStatement' | 'other';
  uploadDate: string;
  fileSize: string;
  fileUrl: string;
}

export const sampleUniversities: University[] = [
  {
    id: '1',
    name: 'Harvard University',
    location: {
      country: 'United States',
      city: 'Cambridge'
    },
    programs: ['Business', 'Law', 'Medicine', 'Engineering', 'Arts & Sciences'],
    tuition: {
      currency: 'USD',
      undergraduate: 51925,
      graduate: 49448
    },
    ranking: 1,
    applicationDeadlines: {
      fall: '2024-01-01',
      spring: '2023-10-15'
    },
    acceptanceRate: 4.6,
    scholarshipsAvailable: true,
    imageUrl: 'https://www.harvard.edu/wp-content/uploads/2021/02/091520_Stock_KS_025.jpg',
    description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, it is the oldest institution of higher learning in the United States and among the most prestigious in the world.'
  },
  {
    id: '2',
    name: 'University of Oxford',
    location: {
      country: 'United Kingdom',
      city: 'Oxford'
    },
    programs: ['Humanities', 'Mathematics', 'Physical & Life Sciences', 'Medical Sciences', 'Social Sciences'],
    tuition: {
      currency: 'GBP',
      undergraduate: 9250,
      graduate: 26770
    },
    ranking: 2,
    applicationDeadlines: {
      fall: '2023-10-15',
      spring: '2023-01-15'
    },
    acceptanceRate: 17.5,
    scholarshipsAvailable: true,
    imageUrl: 'https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/Radcliffe%20Camera%20%28resized%29.jpg',
    description: 'The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world\'s second-oldest university in continuous operation.'
  },
  {
    id: '3',
    name: 'Massachusetts Institute of Technology',
    location: {
      country: 'United States',
      city: 'Cambridge'
    },
    programs: ['Engineering', 'Computer Science', 'Physical Sciences', 'Business & Management', 'Architecture'],
    tuition: {
      currency: 'USD',
      undergraduate: 53790,
      graduate: 53450
    },
    ranking: 3,
    applicationDeadlines: {
      fall: '2024-01-01',
      spring: '2023-10-01'
    },
    acceptanceRate: 6.7,
    scholarshipsAvailable: true,
    imageUrl: 'https://news.mit.edu/sites/default/files/download/201810/MIT-Computer-Announce-01-PRESS.jpg',
    description: 'The Massachusetts Institute of Technology (MIT) is a private research university in Cambridge, Massachusetts. Founded in 1861, MIT has since played a key role in the development of modern technology and science.'
  },
  {
    id: '4',
    name: 'Stanford University',
    location: {
      country: 'United States',
      city: 'Stanford'
    },
    programs: ['Computer Science', 'Engineering', 'Business', 'Law', 'Medicine'],
    tuition: {
      currency: 'USD',
      undergraduate: 56169,
      graduate: 54315
    },
    ranking: 4,
    applicationDeadlines: {
      fall: '2023-12-01',
      spring: '2023-09-15'
    },
    acceptanceRate: 5.2,
    scholarshipsAvailable: true,
    imageUrl: 'https://news.stanford.edu/wp-content/uploads/2017/05/Stanford-campus-1-1024x576.jpg',
    description: 'Stanford University is a private research university in Stanford, California. It is known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world\'s top universities.'
  },
  {
    id: '5',
    name: 'University of Tokyo',
    location: {
      country: 'Japan',
      city: 'Tokyo'
    },
    programs: ['Engineering', 'Science', 'Medicine', 'Humanities', 'Social Sciences'],
    tuition: {
      currency: 'JPY',
      undergraduate: 535800,
      graduate: 804000
    },
    ranking: 23,
    applicationDeadlines: {
      fall: '2023-12-15',
      spring: '2023-08-31'
    },
    acceptanceRate: 33.1,
    scholarshipsAvailable: true,
    imageUrl: 'https://www.u-tokyo.ac.jp/content/400103885.jpg',
    description: 'The University of Tokyo, abbreviated as Todai, is a public research university located in Tokyo, Japan. Established in 1877, it is the first of Japan\'s National Seven Universities and is considered the most prestigious university in Japan.'
  },
  {
    id: '6',
    name: 'ETH Zurich',
    location: {
      country: 'Switzerland',
      city: 'Zurich'
    },
    programs: ['Engineering', 'Architecture', 'Mathematics', 'Natural Sciences', 'Computer Science'],
    tuition: {
      currency: 'CHF',
      undergraduate: 1160,
      graduate: 1160
    },
    ranking: 8,
    applicationDeadlines: {
      fall: '2023-04-30',
      spring: '2022-11-30'
    },
    acceptanceRate: 27,
    scholarshipsAvailable: true,
    imageUrl: 'https://ethz.ch/en/news-and-events/eth-news/news/2021/04/the-open-city-as-a-laboratory/_jcr_content/news_content/textimage_1/image.imageformat.lightbox.935094572.jpg',
    description: 'ETH Zurich is a public research university in the city of Zürich, Switzerland. Founded in 1854, ETH is consistently ranked among the top universities in the world, especially for science and technology.'
  },
  {
    id: '7',
    name: 'Tsinghua University',
    location: {
      country: 'China',
      city: 'Beijing'
    },
    programs: ['Engineering', 'Science', 'Economics', 'Law', 'Medicine'],
    tuition: {
      currency: 'CNY',
      undergraduate: 26000,
      graduate: 33000
    },
    ranking: 15,
    applicationDeadlines: {
      fall: '2023-12-31',
      spring: '2023-09-30'
    },
    acceptanceRate: 2,
    scholarshipsAvailable: true,
    imageUrl: 'https://www.tsinghua.edu.cn/__local/0/7E/BF/7EA0424F79C0D0B7FA3A029C4B5_046E9614_2BFC5.jpg',
    description: 'Tsinghua University is a major research university in Beijing, and a member of the C9 League of Chinese universities. Since its establishment in 1911, it has produced many notable leaders in science, engineering, politics, business, academia, and culture.'
  },
  {
    id: '8',
    name: 'University of Melbourne',
    location: {
      country: 'Australia',
      city: 'Melbourne'
    },
    programs: ['Arts', 'Science', 'Engineering', 'Medicine', 'Business'],
    tuition: {
      currency: 'AUD',
      undergraduate: 32000,
      graduate: 35000
    },
    ranking: 33,
    applicationDeadlines: {
      fall: '2024-01-31',
      spring: '2023-06-30'
    },
    acceptanceRate: 70,
    scholarshipsAvailable: true,
    imageUrl: 'https://study.unimelb.edu.au/__data/assets/image/0027/3608271/varieties/banner.jpg',
    description: 'The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is Australia\'s second oldest university and the oldest in Victoria.'
  }
];

export const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Passport.pdf',
    type: 'passport',
    uploadDate: '2023-12-15',
    fileSize: '2.4 MB',
    fileUrl: '#'
  },
  {
    id: '2',
    name: 'High School Transcript.pdf',
    type: 'transcript',
    uploadDate: '2023-12-10',
    fileSize: '1.8 MB',
    fileUrl: '#'
  },
  {
    id: '3',
    name: 'High School Diploma.pdf',
    type: 'diploma',
    uploadDate: '2023-12-05',
    fileSize: '3.1 MB',
    fileUrl: '#'
  },
  {
    id: '4',
    name: 'IELTS Score Report.pdf',
    type: 'testScore',
    uploadDate: '2023-11-20',
    fileSize: '1.2 MB',
    fileUrl: '#'
  },
  {
    id: '5',
    name: 'Resume.pdf',
    type: 'cv',
    uploadDate: '2023-11-15',
    fileSize: '0.9 MB',
    fileUrl: '#'
  },
  {
    id: '6',
    name: 'Recommendation Letter - Prof. Smith.pdf',
    type: 'letterOfRecommendation',
    uploadDate: '2023-11-10',
    fileSize: '1.5 MB',
    fileUrl: '#'
  },
  {
    id: '7',
    name: 'Personal Statement.pdf',
    type: 'personalStatement',
    uploadDate: '2023-11-05',
    fileSize: '0.7 MB',
    fileUrl: '#'
  }
];
