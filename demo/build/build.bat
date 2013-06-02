call r.js.cmd -o ../src/public/scripts/requirejs-profile.js
call r.js.cmd -o cssIn=../src/public/styles/main.css out=../src/public/styles/output/main-build.css

call jshint ../src/public/scripts/ --config jshint-config.json
call csslint ../src/public/styles/base.css ../src/public/styles/components
