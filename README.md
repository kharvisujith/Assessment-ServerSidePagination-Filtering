# Assessment-ServerSidePagination-Filtering
# Prerequisites
Node.js and npm (Node Package Manager) installed on the machine.
# Clone the Repository 
git clone https://github.com/kharvisujith/Assessment-ServerSidePagination-Filtering.git 


  # Install dependencies for the React application
  `cd dashboard`
  `npm install`
  
 # Install dependencies for the Express application
  `cd apiServer`
  `npm install`

 # Start the React development server
  `cd dashboard`
  `npm start`

 # Start the Express server
  `cd apiServer`
  `npm run dev`


# Access application : 
  `React Applicaton : http://localhost:3000/ ` 
  `apiServer : http://localhost:5000/  `

# Endpoints for Api : 
  Fetch Student details  : http://localhost:5000/api/students  
  It accepts query params for server side pagination and filtering as well : http://localhost:5000/api/students?pageNumber=0&limit=10&name=suj&studentId=AL10.
  
# Note : 
*The pageNumber starts from index 0. (Default pagination for mui TablePagination starts from 0. So In order to keep in align our client and server I have used 0 as the starting page number)  
*Multiple Column filter and pagination fromt the ui is also intergrated.



  


