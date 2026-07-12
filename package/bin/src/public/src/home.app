// src/home.app
{
    page: true
    SEO: true
    v: {
        // View state variables
    }
    e: [
        // --- 1. Navbar ---
        {
            I: 'navbar'
        }
        

        // --- 2. Hero Section ---
        {
            c: 'w-full relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden B_W'
            e: [
                // Background Graphic
                {
                    i:'heroImg',
                    c:'POS_AB WW TT_0 LL_0 OPC_5'
                    e:[
                        {
                            t:'img',
                            src:'hero.jpg',
                            c:'cover'
                        }
                    ]
                    a:{
                        e:'auto'
                        fn:{
                            if(_.theme == "dark"){
                                _.A_CL('heroImg', 'invert');
                            }else{
                                _.D_CL('heroImg', 'invert');
                            }
                        }
                    }
                }
                {
                    c: 'relative z-10  px-4 sm:px-6 lg:px-8 text-center md:flex justify-center items-start'
                    e: [
                        // SaaS Heading
                        {
                          c:'w-full flex items-start mt-28 md:mt-0 '
                          e:[
                            {
                            c: 'my-10 mx-auto p-4  w-full MW_700 WWGLASS rounded-3xl SHs ST_RE9_1'
                            e: [
                                { t: 'h1', s: 't.{hero_title}', c: 'text-4xl md:text-6xl font-extrabold F_B tracking-tight mb-6 leading-tight' },
                                { t: 'p', s: 't.{hero_subtitle}', c: 'text-xl F_B opacity-70 leading-relaxed ' }
                            ]
                        }
                          ]
                        },

                        // Booking Widget
                        {
                          c:'w-full flex justify-center mt-10 md:mt-0 md:ml-10'
                          e:[{
                            c: 'w-full mx-auto DIREC_L MW_500'
                            e: [
                                {
                                    i:'bookingWidgetContainer'
                                    c: 'backdrop-blur-sm rounded-3xl WWGLASS SHs ST_PR_1 p-2 '
                                    e: [
                                        { I: 'components/publicSearchWidget' }
                                    ]
                                }
                                {
                                  i:'resultWidgetContainer'
                                  c: 'backdrop-blur-sm rounded-3xl WWGLASS SHs ST_PR_1 p-2 D_N'
                                  e:[]
                                }
                            ]
                        }]
                        }
                    ]
                }
            ]
        }

        // --- 3. Trusted By (Social Proof) ---
        {
            c: 'w-full py-10 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700'
            e: [
                {
                    c: 'main px-4 text-center'
                    e: [
                        { t: 'p', s: 't.{trusted_by_leaders}', c: 'text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6' },
                        {
                            c: 'flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500'
                            e: [
                                // Placeholders for logos using icons for now
                                { c:'flex items-center gap-2', e:[{t:'icon', c:'ICO-bus-alt-1 F_S_30 F_B'}, {t:'b', s:'TravelCo', c:'F_S_20 F_B'}] },
                                { c:'flex items-center gap-2', e:[{t:'icon', c:'ICO-globe F_S_30 F_B'}, {t:'b', s:'GlobalTransit', c:'F_S_20 F_B'}] },
                                { c:'flex items-center gap-2', e:[{t:'icon', c:'ICO-shield F_S_30 F_B'}, {t:'b', s:'SecureMove', c:'F_S_20 F_B'}] },
                                { c:'flex items-center gap-2', e:[{t:'icon', c:'ICO-award F_S_30 F_B'}, {t:'b', s:'BestWay', c:'F_S_20 F_B'}] }
                            ]
                        }
                    ]
                }
            ]
        }

        // --- 4. Key Features Grid ---
        {
            i: 'featuresSection'
            c: 'py-24 B_W'
            e: [
                {
                    c: 'main px-4 sm:px-6 lg:px-8'
                    e: [
                        {
                            c: 'text-center mb-16'
                            e: [
                                { t: 'h1', s: 't.{features}', c: 'F_PR font-bold F_S_50 tracking-wide uppercase LH_1 ' },
                                { t: 'h2', s: 't.{features_heading}', c: 'mt-2  font-extrabold F_B sm:text-4xl ' }
                            ]
                        },
                        {
                            c: 'grid grid-cols-1 md:grid-cols-3 gap-8'
                            e: [
                                // Feature 1: Fleet
                                {
                                    c: 'p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 SHs hover:shadow-xl transition-all duration-300 group'
                                    e: [
                                        { c: 'w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6', e: [{ t: 'icon', c: 'ICO-bus-alt-1 text-blue-600 dark:text-blue-300 F_S_28' }] },
                                        { t: 'h3', s: 't.{feat_fleet_title}', c: 'text-xl font-bold F_B mb-3' },
                                        { t: 'p', s: 't.{feat_fleet_desc}', c: 'F_B opacity-70 leading-relaxed' }
                                    ]
                                },
                                // Feature 2: Operations
                                {
                                    c: 'p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 SHs hover:shadow-xl transition-all duration-300 group'
                                    e: [
                                        { c: 'w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-6', e: [{ t: 'icon', c: 'ICO-chart-flow-1 text-orange-600 dark:text-orange-300 F_S_28' }] },
                                        { t: 'h3', s: 't.{feat_ops_title}', c: 'text-xl font-bold F_B mb-3' },
                                        { t: 'p', s: 't.{feat_ops_desc}', c: 'F_B opacity-70 leading-relaxed' }
                                    ]
                                },
                                // Feature 3: HR & Payroll
                                {
                                    c: 'p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 SHs hover:shadow-xl transition-all duration-300 group'
                                    e: [
                                        { c: 'w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6', e: [{ t: 'icon', c: 'ICO-users-social text-green-600 dark:text-green-300 F_S_28' }] },
                                        { t: 'h3', s: 't.{feat_hr_title}', c: 'text-xl font-bold F_B mb-3' },
                                        { t: 'p', s: 't.{feat_hr_desc}', c: 'F_B opacity-70 leading-relaxed' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        // --- 5. Deep Dive (Solutions) ---
        {
            i: 'solutionsSection'
            c: 'py-20 bg-gray-50 dark:bg-gray-800'
            e: [
                {
                    c: 'main px-4'
                    e: [
                        // Row 1: Image Left, Text Right
                        {
                            c: 'flex flex-col md:flex-row items-center gap-12 mb-20'
                            e: [
                                {
                                    c: 'D_N w-full md:w-1/2'
                                    i: 'dashboardSection'
                                    e: [{ t: 'img', src: 'dashboard.png', c: 'rounded-xl SHs w-full object-cover transform hover:scale-105 transition-transform duration-500' }] // Placeholder image
                                }, {
                                    c: 'D_N w-full md:w-1/2'
                                    i: 'dashboardSectionD'
                                    e: [{ t: 'img', src: 'dashboardD.png', c: 'rounded-xl SHs w-full object-cover transform hover:scale-105 transition-transform duration-500' }] // Placeholder image
                                },
                                {
                                    c: 'w-full md:w-1/2'
                                    e: [
                                        { t: 'h3', s: 't.{comprehensive_dashboard}', c: 'text-3xl font-bold F_B mb-4' },
                                        { t: 'p', s: 't.{dashboard_desc}', c: 'text-lg F_B opacity-70 mb-6 leading-relaxed' },
                                        {
                                            c: 'space-y-3'
                                            e: [
                                                { c:'flex items-center gap-3', e:[{t:'icon', c:'ICO-check F_S_20 F_PR'}, {t:'span', s:'t.{real_time_analytics}', c:'F_B'}] },
                                                { c:'flex items-center gap-3', e:[{t:'icon', c:'ICO-check F_S_20 F_PR'}, {t:'span', s:'t.{finance_tracking}', c:'F_B'}] },
                                                { c:'flex items-center gap-3', e:[{t:'icon', c:'ICO-check F_S_20 F_PR'}, {t:'span', s:'t.{user_roles}', c:'F_B'}] }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // Row 2: Text Left, Image Right
                        {
                            c: 'flex flex-col md:flex-row-reverse items-center gap-12'
                            e: [
                                {
                                    c: 'w-full md:w-1/2 D_N'
                                    i: 'busDesignSection'
                                    e: [{ t: 'img', src: 'busDesign.png', c: 'rounded-xl SHs w-full object-cover transform hover:scale-105 transition-transform duration-500' }] // Placeholder image
                                },{
                                    c: 'w-full md:w-1/2 D_N'
                                    i: 'busDesignSectionD'
                                    e: [{ t: 'img', src: 'busDesignD.png', c: 'rounded-xl SHs w-full object-cover transform hover:scale-105 transition-transform duration-500' }] // Placeholder image
                                },
                                {
                                    c: 'w-full md:w-1/2'
                                    e: [
                                        { t: 'h3', s: 't.{advanced_booking_engine}', c: 'text-3xl font-bold F_B mb-4' },
                                        { t: 'p', s: 't.{booking_engine_desc}', c: 'text-lg F_B opacity-70 mb-6 leading-relaxed' },
                                        {
                                            t: 'bt'
                                            c: 'px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition-all'
                                            s: 't.{learn_more}'
                                                a: { fn:{ _.openRoot('solutions') } }
                                        }
                                    ]
                                }
                            ]
                        }
                        {
                          a:{
                            e:'auto'
                            fn:{
                                if(_.theme == "dark"){
                                    _.A_CL('dashboardSectionD', 'D_N');
                                    _.D_CL('dashboardSection', 'D_N');
                                    _.A_CL('busDesignSectionD', 'D_N');
                                    _.D_CL('busDesignSection', 'D_N');
                                }else{
                                    _.D_CL('dashboardSectionD', 'D_N');
                                    _.A_CL('dashboardSection', 'D_N');
                                    _.D_CL('busDesignSectionD', 'D_N');
                                    _.A_CL('busDesignSection', 'D_N');
                                }
                            }
                          }
                        }
                    ]
                }
            ]
        }

        // --- 6. Stats Section ---
        {
            c: 'py-16 B_PR text-white'
            e: [
                {
                    c: 'main px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
                    e: [
                        { e: [{ t:'b', s:'10M+', c:'text-4xl font-extrabold block mb-2' }, { t:'span', s:'t.{tickets_sold}', c:'opacity-80' }] },
                        { e: [{ t:'b', s:'500+', c:'text-4xl font-extrabold block mb-2' }, { t:'span', s:'t.{companies}', c:'opacity-80' }] },
                        { e: [{ t:'b', s:'99.9%', c:'text-4xl font-extrabold block mb-2' }, { t:'span', s:'t.{uptime}', c:'opacity-80' }] },
                        { e: [{ t:'b', s:'24/7', c:'text-4xl font-extrabold block mb-2' }, { t:'span', s:'t.{support}', c:'opacity-80' }] }
                    ]
                }
            ]
          
        }

        // --- 7. Call to Action (CTA) ---
        {
            c: 'py-20 B_W'
            e: [
                {
                    c: 'main px-4 text-center'
                    e: [
                        {
                            c: 'main mx-auto bg-black rounded-3xl p-10 md:p-16 SHs relative overflow-hidden'
                            e: [
                                {
                                    c: 'POS_AB TT_0 LL_0 WW HH_0'
                                    e: [
                                        { t: 'img', src: 'heroColor.jpg', c: 'cover md:mt-16 -mt-16' }
                                    ]
                                }
                                
                                {
                                  c:'WW TT_0 LL_0 BBGLASS p-4 rounded-3xl '
                                  e:[
                                    { t: 'h2', s: 't.{ready_to_transform}', c: 'text-3xl md:text-4xl font-bold text-white mb-6 relative z-10' },
                                { t: 'p', s: 't.{join_thousands}', c: 'text-gray-300 mb-8 text-lg relative z-10' },
                                {
                                    t: 'bt'
                                    c: 'px-8 py-4 rounded-full B_PR text-white font-bold text-lg hover:opacity-90 transform hover:scale-105 transition-all shadow-lg relative z-10'
                                    s: 't.{get_started_now}'
                                    a: { fn:{ _.openRoot('auth/register') } }
                                }
                                  ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        // --- 8. Footer ---
        {
            i: 'footerSection'
            I: 'footer'
        }
    ]
}