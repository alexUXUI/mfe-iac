exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    const querystring = request.querystring;
    const params = new URLSearchParams(querystring);

    const env = params.get('env');
    const module = params.get('module');
    const version = params.get('version');
    console.log(`env: ${env} | module: ${module} | version: ${version}`);

    if (env && module && version) {
        console.log('Adding path prefix');
        request.uri = `/${env}/${module}/${version}/index.html`;
    } else {
        request.uri = '/index.html';
    }

    console.log(`Rewritten URI: ${request.uri}`);
    return request;
};