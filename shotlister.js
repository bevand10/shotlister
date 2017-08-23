var bbc=bbc||{};
bbc.newslabs=bbc.newslabs||{};
bbc.newslabs.shotlister=bbc.newslabs.shotlister||{};

bbc.newslabs.shotlister.openfcpxml=function(){
    document.getElementById('inputfiles').click();
    console.log(this);
}

bbc.newslabs.shotlister.procfcpxml=function(fcpxml){

    // cache the from-user fcp xml project file
    if(fcpxml!=='__xsltready'){
        console.log('Parse/cache the from-user fcpxml document');
        this.$fcpxml=new DOMParser().parseFromString(fcpxml, 'application/xml');
    }

    if(!this.$fcpxslt)
    {
        // load/cache the xslt
        var _that=this;
        $.get({url: 'fcpxml.xslt?', cache: false}, function(xslt){
            _that.$fcpxslt=xslt;
            _that.procfcpxml('__xsltready');
        });
    } else {
        // process and display
        console.log('Process "' + this.$f.name + '" using xslt');

        this.$p=new XSLTProcessor();
        this.$p.importStylesheet(this.$fcpxslt);
        this.$out=this.$p.transformToFragment(
            this.$fcpxml,
            document.implementation.createDocument('', 'output', null)
        );

        document.getElementById('out').innerHTML=this.$out.firstChild.innerHTML;

        Output('success', this.$f.name + " (" + this.$f.size + " bytes)");
    }
}
