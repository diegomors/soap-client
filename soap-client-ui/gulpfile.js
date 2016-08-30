var gulp    = require('gulp');
var replace = require('gulp-replace');
var insert  = require('gulp-insert');

var profile={
    desenvolvimento:{
        url:"http://localhost:8001"
    },
    homologacao:{
        url:"http://dns-hom.com.br"
    },
    producao:{
        url:"http://dns-prod.com.br"
    }
}

gulp.task('default', function() {
  // place code for your default task here
  console.log('gulp funcionando corretamente');
});

gulp.task('desenvolvimento', function(){

  //editar index.html e templates substituindo a origem dos scripts e css

  gulp.src(['WebContent/index.html'])
    .pipe(replace(/<script(.+)src *= *"(.*)\/comum-ui/g, '<script$1src="'+profile.desenvolvimento.url+'/soap-client-ui'))
    .pipe(replace(/<link(.+)href *= *"(.*)\/comum-ui/g, '<link$1href="'+profile.desenvolvimento.url+'/soap-client-ui'))
    .pipe(replace(/<img(.+)src *= *"(.*)\/comum-ui/g, '<img$1src="'+profile.desenvolvimento.url+'/soap-client-ui'))
    .pipe(replace(/<a(.+)href *= *"(.*)\/comum-ui/g, '<a$1href="'+profile.desenvolvimento.url+'/soap-client-ui'))
    .pipe(gulp.dest('WebContent'));
});


gulp.task('homologacao', function(){

  //editar index.html e templates substituindo a origem dos scripts e css

  gulp.src(['WebContent/index.html'])
    .pipe(replace(/<script(.+)src *= *"(.*)\/comum-ui/g, '<script$1src="'+profile.homologacao.url+'/soap-client-ui'))
    .pipe(replace(/<link(.+)href *= *"(.*)\/comum-ui/g, '<link$1href="'+profile.homologacao.url+'/soap-client-ui'))
    .pipe(replace(/<img(.+)src *= *"(.*)\/comum-ui/g, '<img$1src="'+profile.homologacao.url+'/soap-client-ui'))
    .pipe(replace(/<a(.+)href *= *"(.*)\/comum-ui/g, '<a$1href="'+profile.homologacao.url+'/soap-client-ui'));
});

gulp.task('homologacao', function(){

  //editar index.html e templates substituindo a origem dos scripts e css

  gulp.src(['WebContent/index.html'])
    .pipe(replace(/<script(.+)src *= *"(.*)\/comum-ui/g, '<script$1src="'+profile.producao.url+'/soap-client-ui'))
    .pipe(replace(/<link(.+)href *= *"(.*)\/comum-ui/g, '<link$1href="'+profile.producao.url+'/soap-client-ui'))
    .pipe(replace(/<img(.+)src *= *"(.*)\/comum-ui/g, '<img$1src="'+profile.producao.url+'/soap-client-ui'))
    .pipe(replace(/<a(.+)href *= *"(.*)\/comum-ui/g, '<a$1href="'+profile.producao.url+'/soap-client-ui'));
});
