export default function asyncDownLoadApp(path, cb) {
    let { component, action, reducer } = {
        component: require('./apps/dynamicUI/index').default,
        action: require('./apps/dynamicUI/action'),
        reducer: require('./apps/dynamicUI/reducer')
    }
    require.ensure([], require => {
        if (path === 'apps/root') {
            require.ensure([], require => {
                cb(require('./apps/root/index').default,
                    require('./apps/root/action'),
                    require('./apps/root/reducer'))
            }, 'apps-root')

        }else if (path === 'apps/login/login') {
            require.ensure([], require => {
                cb(require('./apps/login/login/index').default,
                    require('./apps/login/login/action'),
                    require('./apps/login/login/reducer'))
            }, 'apps-login')

        }else if (path === "apps/common/retrieve") {
            require.ensure([], require => {
                cb(require('./apps/common/retrieve/index').default,
                    require('./apps/common/retrieve/action'),
                    require('./apps/common/retrieve/reducer'))
            }, 'apps-common-retrieve')
        }else if (path === "apps/common/subjectsMenuTree") {
            require.ensure([], require => {
                cb(require('./apps/common/subjectsMenuTree/index').default,
                    require('./apps/common/subjectsMenuTree/action'),
                    require('./apps/common/subjectsMenuTree/reducer'))
            }, 'apps-common-subjectsMenuTree')
        }else if (path === "apps/common/accessory") {
            require.ensure([], require => {
                cb(require('./apps/common/accessory/index').default,
                    require('./apps/common/accessory/action'),
                    require('./apps/common/accessory/reducer'))
            }, 'apps-common-accessory')
        }else if (path === "apps/common/adjunct") {
            require.ensure([], require => {
                cb(require('./apps/common/adjunct/index').default,
                    require('./apps/common/adjunct/action'),
                    require('./apps/common/adjunct/reducer'))
            }, 'apps-common-adjunct')
        }

        else if (path === "apps/common/video") {
            require.ensure([], require => {
                cb(require('./apps/common/video/index').default
            )}, 'apps-common-video')
        }
        else if (path === "apps/common/seeImg") {
            require.ensure([], require => {
                cb(require('./apps/common/seeImg/index').default
            )}, 'apps-common-seeImg')
        }

        else if (path === 'apps/portal') {
            require.ensure([], require => {
                cb(require('./apps/portal/index').default,
                    require('./apps/portal/action'),
                    require('./apps/portal/reducer'))
            }, 'apps-portal')
        }
    })
}
