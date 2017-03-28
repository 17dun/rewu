/**
 * @file gulpfile.js
 * @desc 自动化脚本
 * @author xiaoguang01
 * @date 2015/9/25
 */
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import livereload from 'gulp-livereload';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import less from 'gulp-less';
import minifyCss from 'gulp-minify-css';
import fs from 'fs';
import opn from 'opn';
import gulpSequence from 'gulp-sequence';
import {spawnSync} from 'child_process';
import bable from 'gulp-babel';
import del from 'del';
import webpack from 'gulp-webpack';


const paths = {
  allSrcJs: 'src/**/*.js',
  libDir: 'lib',

};


// 监听静态文件和模板以及pid修改，并刷新页面
gulp.task('watch',() => {
    livereload.listen(8002);
    gulp.watch([
        './pid',
        'server/template/**/*.*',
        'client/src/!photo/*.*'
    ], ['babel', (event) => {
        gulp.src('').pipe(livereload());
    }])
});

gulp.task('open', () => {
	opn('http://127.0.0.1:8000', {app: ['google chrome']})
})

gulp.task('up', () => {
    spawnSync('git',['pull']);
})

gulp.task('dep', () => {
    spawnSync('npm',['install','--production']);
})

gulp.task('ci', () => {
    spawnSync('git',['add', '.']);
    spawnSync('git',['commit','-m', 'update']);
    spawnSync('git',['push']);
})


gulp.task('babel', ['clean'], () => {
  return gulp.src('./server/src/**/*.js')
        .pipe(bable())
        .pipe(gulp.dest('./server/dist'));
})

gulp.task('clean', ['conf'], () => {
    return del('./server/dist');
})

gulp.task('conf', () => {
  return gulp.src('./server/src/conf/dev/index.js')
        .pipe(gulp.dest('./server/src/conf'));
})

gulp.task('start', ['babel'], () => {
    nodemon({
        script: './server/dist/bootSrtap.js',
        ext: 'js',
        execMap: {
            js: 'node --harmony'
        },
        args: [
            '--color'
        ],
        ignore: [
            'server/src/conf/index.js',
            'server/dist'
        ]
    });
});


gulp.task('deploy', () => {
    gulp.src('conf/online/index.js')
        .pipe(gulp.dest('conf'));
    spawnSync('pm2',['stop', 'server/bootSrtap.js']);
    spawnSync('pm2',['start', 'server/bootSrtap.js']);
});


//=================client端===============//
gulp.task('build', () => {
    // 移动端js
    let jsArr = [];
    let data = fs.readFileSync('client/src/js/online.js', 'utf8');
    let arr = data.split('\n');
    arr.forEach((item) => {
        let regx = /src=\"(.+)\"/;
        if (regx.test(item)) {
            let jsItem = item.match(regx)[1];
            if (jsItem !== '') {
                jsArr.push('client/src' + jsItem);
            }
        }
    });

    gulp.src(jsArr).pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('client/dist/js/'));


    //pc合并
    let pcJsArr = [];
    let pcData = fs.readFileSync('client/src/js/online-pc.js', 'utf8');
    let pcArr = pcData.split('\n');

    pcArr.forEach((item) => {
        let regx = /src=\"(.+)\"/;
        if (regx.test(item)) {
            let jsItem = item.match(regx)[1];
            if (jsItem !== '') {
                pcJsArr.push('client/src' + jsItem);
            }
        }
    });

    gulp.src(pcJsArr)
        .pipe(bable())
        .pipe(concat('pc-bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('client/dist/js/'));


    // page部分的压缩合并
    gulp.src('client/src/js/page/**/*.js')
        .pipe(bable())
        .pipe(gulp.dest('client/src/js/page'))
        .pipe(uglify())
        .pipe(gulp.dest('client/dist/js/page'))

    // //压缩编译cess
    gulp.src(['client/src/css/**/*.css'])
    	.pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('client/dist/css/'));

    //压缩编译less
    gulp.src(['client/src/less/common.less'])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(concat('pc-bundle.css'))
        .pipe(gulp.dest('client/dist/css/'));


    // 拷贝图片
    gulp.src('client/src/img/*.{png,jpg,jpeg}')
        .pipe(gulp.dest('client/dist/img'));

    // 拷贝iconfont文件
    gulp.src('client/src/font/*.{ttf,woff,eot,svg}')
        .pipe(gulp.dest('client/dist/font'));

});

//=================client端===============//



// livereload
gulp.task('reload', () => {
    gulp.src('')
        .pipe(livereload());
});

// 运行Gulp时，默认的Task
gulp.task('dev', gulpSequence(
    'start',
    'watch',
    'open'
));

//上线
gulp.task('online', gulpSequence('build', 'deploy'));

//下线
gulp.task('offline', () => {
    spawnSync('pm2', ['stop', 'server/bootSrtap.js']);
});