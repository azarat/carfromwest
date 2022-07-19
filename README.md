# carsfromwest.com.ua
#### Frontend Next JS with Typescript on DigitalOcean.
#### Backend the same Next Js server api handler.
#### CFW frontend sends request to own API to prepare data.    
#### CFW API sends request to Express (Node.js framework) on the same DO droplet.
#### Express is used as proxy to fetch data from api.carsfromwest.com


#### api.carsfromwest.com is NOT our project, cannot be modified and has no documnetation.


#### CFW NextJs on DO droplet path is /var/www/html/cfw-react-2022/
 - To run as a background service "(yarn start &)"


#### CFW Express proxy in DO droplet path is /var/www/html/projects/proxy/
##### To run as a background service "(node index.js &)"


#### Project uses Yarn packege manager. All dependencies are listed in package.json file.


### Workflow
 - Push the code after modifications on your local system (dev environment) to GitHub on Dev branch. Merge dev into main.
 - Pull the code on DO droplet (prod environment).
 - Pull the code on DO droplet (prod environment).
 - Run "ps -ef | grep node" to show all node processes.
 - Kill all node processes related to "yarn" and "cfw-react-2022" with "kill -9 [pid]" (e.g. kill -9 12345)
 - Build new code with "yarn build"
 - Run CFW as a service with (yarn start &)
 - In case of modification Express proxy kill the "node index.js" process and run again with "(node index.js &)"
