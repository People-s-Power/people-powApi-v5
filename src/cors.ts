//   const devOrigins = [
//     'http://localhost',
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'http://localhost:3002',
//     'localho.st:3000',
//   ];
  const prodOrigins = [
    'https://peoplespow.com',
  
      /\.peoplespow\.com$/,
        'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'localho.st:3000',
  ];


//   const resquestOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins;

  const resquestOrigins =  prodOrigins;


export const corsOptions = {
      
    origin: (origin: any, callback: Function) => {

        if (resquestOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by Cors"))
        }

    },
    optionsSuccessStatus: 200
      
}
  
export const credentials = (req: any, res: any, next: any) => {
    const origin = req.headers.origin;

    if (resquestOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credetials", true)
    }

    next();
}