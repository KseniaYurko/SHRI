module.exports = function(configValue) {

	function makeDynamicConfig (options){
        const dynamicOptions = {};
        for (const key in options){
            const value = options[key];
            if (typeof value === 'object' && value !== null){
                dynamicOptions[key] = makeDynamicConfig(value);
            } 
            else if (Array.isArray(value)){
                dynamicOptions[key] = value.map((v) => (typeof v === 'object' && v !== null) ? makeDynamicConfig(v) : dynamicConfigValue(v));
            } 
            else{
                dynamicOptions[key] = dynamicConfigValue(value);
            }
        }

        return dynamicOptions;
    };

    function dynamicConfigValue (key) {
        const getConfigValue = () => configValue(key);
        const proxyHandler = {
            get(target, prop){
                if (prop === 'toString'){
                    return getConfigValue;
                } 
                else{
                    return dynamicConfigValue(`${key}:${prop}`);
                }
            },
        };

        return new Proxy(getConfigValue, proxyHandler);
    };

	const makeDynamicConfig = e => e;
	const dynamicConfigValue = configValue;

	return {
		makeDynamicConfig,
		dynamicConfigValue,
	};
}