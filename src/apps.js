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

        }else  if(path === "apps/common/coding"){
            require.ensure([], require => {
                 cb(require('./apps/common/coding/index').default,
                    require('./apps/common/coding/action'),
                    require('./apps/common/coding/reducer'))
             }, 'apps-coding')
         }
        else if (path === 'apps/login/login') {
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
        }else if (path === 'apps/templates/voucher') {
            require.ensure([], require => {
                cb(require('./apps/templates/voucher/index').default,
                    require('./apps/templates/voucher/action'),
                    require('./apps/templates/voucher/reducer'))
            }, 'apps-voucher')

        } else if (path === 'apps/templates/list') {
            require.ensure([], require => {
                cb(require('./apps/templates/list/index').default,
                    require('./apps/templates/list/action'),
                    require('./apps/templates/list/reducer'))
            }, 'apps-list')

        }  else if (path === "apps/about") {
            require.ensure([], require => {
                cb(require('./apps/about/index').default)
            }, 'apps-about')

        } else if (path === "apps/welcome") {
            require.ensure([], require => {
                cb(require('./apps/welcome/welcome/index').default,
                    require('./apps/welcome/welcome/action'),
                    require('./apps/welcome/welcome/reducer'))
            }, 'apps-welcome')

        } else if (path === "apps/welcome/flowChart") {
            require.ensure([], require => {
                cb(require('./apps/welcome/flowChart/index').default,
                    require('./apps/welcome/flowChart/action'),
                    require('./apps/welcome/flowChart/reducer'))
            }, 'apps-welcome-flowChart')
        }else if (path === "apps/welcome/systemUpdate") {
            require.ensure([], require => {
                cb(require('./apps/welcome/systemUpdate/index').default,
                    require('./apps/welcome/systemUpdate/action'),
                    require('./apps/welcome/systemUpdate/reducer'))
            }, 'apps-welcome-systemUpdate')

        } else if (path === "apps/welcome/addAccount") {
            require.ensure([], require => {
                cb(require('./apps/welcome/welcome/addAccount/index').default,
                    require('./apps/welcome/welcome/addAccount/action'),
                    require('./apps/welcome/welcome/addAccount/reducer'))
            }, 'apps-welcome-addAccount')

        } else if (path === "apps/welcome/accountFull") {
            require.ensure([], require => {
                cb(require('./apps/welcome/welcome/accountFull/index').default,
                    require('./apps/welcome/welcome/accountFull/action'),
                    require('./apps/welcome/welcome/accountFull/reducer'))
            }, 'apps-welcome-accountFull')

        } else if (path === "apps/welcome/charts/circle") {
            require.ensure([], require => {
                cb(require('./apps/welcome/charts/circle/index').default)
            }, 'apps-welcome-charts-circle')

        } else if (path === "apps/welcome/charts/pie") {
            require.ensure([], require => {
                cb(require('./apps/welcome/charts/pie/index').default)
            }, 'apps-welcome-charts-pie')

        } else if (path === "apps/welcome/charts/line") {
            require.ensure([], require => {
                cb(require('./apps/welcome/charts/line/index').default)
            }, 'apps-welcome-charts-line')

        } else if (path === "apps/welcome/charts/lineCust") {
            require.ensure([], require => {
                cb(require('./apps/welcome/charts/lineCust/index').default)
            }, 'apps-welcome-charts-lineCust')

        } else if (path === "apps/welcome/charts/bar") {
            require.ensure([], require => {
                cb(require('./apps/welcome/charts/bar/index').default)
            }, 'apps-welcome-charts-bar')

        }
        else if (path === "apps/welcome/gettingStarted/gettingStartedForAdmin") {
            require.ensure([], require => {
                cb(require('./apps/welcome/gettingStarted/gettingStartedForAdmin/index').default,
                    require('./apps/welcome/gettingStarted/gettingStartedForAdmin/action'),
                    require('./apps/welcome/gettingStarted/gettingStartedForAdmin/reducer'))
            }, 'apps-welcome-gettingStarted-gettingStartedForAdmin')

        }else if (path === "apps/welcome/gettingStarted/operationProcess") {
            require.ensure([], require => {
                cb(require('./apps/welcome/gettingStarted/operationProcess/index').default,
                    require('./apps/welcome/gettingStarted/operationProcess/action'),
                    require('./apps/welcome/gettingStarted/operationProcess/reducer'))
            }, 'apps-welcome-gettingStarted-operationProcess')

        }else if (path === "apps/welcome/gettingStarted/zfGettingStartedForAdmin") {
            require.ensure([], require => {
                cb(require('./apps/welcome/gettingStarted/zfGettingStartedForAdmin/index').default,
                    require('./apps/welcome/gettingStarted/zfGettingStartedForAdmin/action'),
                    require('./apps/welcome/gettingStarted/zfGettingStartedForAdmin/reducer'))
            }, 'apps-welcome-gettingStarted-zfGettingStartedForAdmin')

        }
        else if (path === "apps/common/mail") {
            require.ensure([], require => {
                cb(require('./apps/common/mail/index').default,
                require('./apps/common/mail/action'),
                require('./apps/common/mail/reducer'))
            }, 'apps-common-mail')

        }
        else if (path === "apps/common/qqFriend") {
            require.ensure([], require => {
                cb(require('./apps/common/qqFriend/index').default,
                require('./apps/common/qqFriend/action'),
                require('./apps/common/qqFriend/reducer'))
            }, 'apps-common-qqFriend')

        }
        else if (path === "apps/common/qrCode") {
            require.ensure([], require => {
                cb(require('./apps/common/qrCode/index').default,
                require('./apps/common/qrCode/action'),
                require('./apps/common/qrCode/reducer'))
            }, 'apps-common-qrCode')

        }
        else if (path === 'apps/demo/card') {
            require.ensure([], require => {

                cb(require('./apps/demo/card/index').default,
                    require('./apps/demo/card/action'),
                    require('./apps/demo/card/reducer'))
            }, 'apps-demo-card')

        } else if (path === 'apps/demo/voucher') {
            require.ensure([], require => {
                cb(require('./apps/demo/voucher/index').default,
                    require('./apps/demo/voucher/action'),
                    require('./apps/demo/voucher/reducer'))
            }, 'apps-demo-voucher')

        } else if (path === 'apps/demo/list') {
            require.ensure([], require => {
                cb(require('./apps/demo/list/index').default,
                    require('./apps/demo/list/action'),
                    require('./apps/demo/list/reducer'))
            }, 'apps-demo-list')

        }else if (path === 'apps/test') {
            require.ensure([], require => {
                cb(require('./apps/test/index').default,
                    require('./apps/test/action'),
                    require('./apps/test/reducer'))
            }, 'apps-test')

        }
       
    })

}
