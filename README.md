# BuddyConnect

https://buddyconnecter.herokuapp.com/

## A Social Media Website
#### Created using the MERN Stack (MongoDB, Express.js, React + Redux, Node.js)

If you want to use this website and make changes yourself, then you will need to create a .env file with the following structure and add it to the project root: 
```
MONGO_URI="your personal mongodb uri here"
SECRET_KEY="your personal secret key for use with bcrypt in hashing/unhashing passwords"
AWS_ACCESS_KEY_ID="your personal access key id for an IAM user on AWS working with a bucket on S3"
AWS_SECRET_ACCESS_KEY="your personal secret access key for an IAM user on AWS working with a bucket on S3"
BUCKET_NAME="the name of your bucket on AWS S3"
RECAPTCHA_SECRET_KEY="secret key provided when using google reCAPTCHA", you will also need to change the sitekey to what google gives you for the ReCaptcha component on the front-end!
```

You probably will also want to edit the footer!
