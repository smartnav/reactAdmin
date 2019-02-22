const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
     //['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
	 ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
     config,
   );
   
	config = rewireLess.withLoaderOptions({
		modifyVars: {
			"@primary-color": "#be3427",                        
			"@link-color": "#be3427",
			"@error-color": "#ff4231",
			"@box-shadow-base": "0 2px 8px rgba(190, 52, 39, .15)",
			"@input-hover-border-color": "#d9d9d9",
			/* "@success-color": "#52c41a",                         
			"@warning-color": "#f5db52",
			"@font-size-base": "14px",                          
			"@heading-color": "rgba(0, 0, 0, .85)",             
			"@text-color": "rgba(0, 0, 0, .65)",                 
			"@text-color-secondary" : "rgba(0, 0, 0, .45)",      
			"@disabled-color" : "rgba(0, 0, 0, .25)",            
			"@border-radius-base": "4px",                        
			"@border-color-base": "#d9d9d9",                     
			"@box-shadow-base": "0 2px 8px rgba(0, 0, 0, .15)", */ 
		},
		javascriptEnabled: true,
	})(config, env);
  return config;
};