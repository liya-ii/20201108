const $ = new Env('晶彩看点-基本任务');
const notify = $.isNode() ? require('./sendNotify') : '';

const hour = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
const minute = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getMinutes();

const TS = Math.round((new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000) / 1000);
let i = '',m = '',n = '',s = '';

let basicApi = 'CommonReward/toGetReward.json',signBody = 'p=iwQenZDazcfA=dm513w40Oy-qLYwy7kMYwhBboxLiaMmQqfWV9fH4V8s6_mqpfALN8pyFfs77jAT1kjUjnzB3maWtpg0ig9KCw0vrUnxeOAP0Q738gQyxMXyRTLbsWtoKAUYJhj21PXUjYsPhRBBSDtdTREIFUbqo3BhOs0PQkVedCW3Z2o8ax4yaltyzEZlVoMXj9IC0sF1Ay5KhvB1P8Tnv7Q5BTmyKm7vcSQCIkLAPdnuWJQ7xa2wKJmghlZpIPNBYv3qA8yLD7zdWfuxK1k2lSHj5Sddc3oFDSV5-CmMQ1Yh9_Uiw9p5iAfp7jKOxIU-oWg_-y6P3jz9R9vM-0ENJhKzkJ-0EOzhrIX1BQ2BYRvHM1BpICQIJ8gvjew3d3IMBi1L44TtaSQ0tuvAjd794_6ZhxAqGPM2297xzYdOj9hQ1Nf5KT8e-5JBLkrSz4QY8BV_EG9X54YbjCFGiuZudkXW3Cp3DrAL0reNxCShbHQG4Qw5CNOusId0foxMEX979yHB7X8ZB6hpGtIjL71eFjv41JdglCSfRgpuFHcNiHtxcJLZHB-kXCg2byux-ovqtx5PyAfrFxJSMw0Yw-6L7GPvDwvRQix-z5VspSPaUt6NkFQaWrnwuL1NfdoIfmY5UCWE4Jr_N5s1mKYf_cWSgaTlcjOS-0HMw8TyVqlY7rXRN0JwCJGobYPhrqVL9aPuB82lRp5FQaO9A_YVYvotK28DuAF-tfLl4p8si4ozWLbfP-Hs--i9nnh7x19EP-DTp9TdpAK8PE7itwFyv5rHa979FUaijLLmiVYliwOu4JrDJtND7Cz-j8c2LQnawbwsXp4mb8WRSHXoQVjDDJdLRgYQU2lAvn69tZofG3OmGASDBItIKfrK3RVRpbP-AxzB3mMx-JoIyP90ztNl53k4xieaiLDcyrBkcSjMOVt4E1uAHrO3RJ2b_5WtAjgJYaPbXwujCjVdtEUHhQbMpUeFEhwypz8DtCEMwiJl9cD4OhhurOo7HDijnrZ_ZaM6qgkpI2ZM3L3vHuVkQlRzWCaynw6vAFl2VVkiFEerrU_avNPKswjbJ5qCGym-fytQx8NAroR0BSzcMfFSRM90N-kAmXhHm20-8Ss9FQA77k9_O0ynZpzUcLDcqfGAQSgF8E6TBIA3sVvz8_AOg1WFi8SU86IAIsXrAnAoETRPxxdJbX1';
let doubleSignApi = 'CommonReward/toDouble.json',doubleSignBody = 'p=e6NplMcA3HQU=LusHiTcKlf6WHWTzJlW1GHl7FXW-eVtb6FN4uYeoviDWGMR6xo06ahbN4Pe-Php9T15g5XjKegMxuH1dCczpl0Nr0QghOppQDiv1zpkJAZS6TOueyBx08Beuh35Ycz9WgwMFBXnhxnnov3Lwz_nE5ezaiLkT05LBtT-vehoDo2gs3GzqQZQgSVZ3lMv-U9XfqxJXq4UC5LiFl9xgchA1jan1IVytLbYPF21Vvs3qV9cM4WbWzpzumtBER5IsaIqs6uELvc9s5mh5_vZ89Taz16Y9lRzQnYBZD8DBBj24nn2cFboXaTPd8ounC_IltGGJnjHDHm8GeaAzBVJYZ8dTlMqZoCTAXhT71qb6VkjoUM8hFd1RIJxJlOQgrHoSNG6NKUAoxT4jhLpaQyS6vZOh6irj7R-HIZ8FieSs3V04vJyClfe95puB_-3Ryr7BQJir4DQJL5nkcUvUVigL5a2XVVqTEhRrZUCslKjPqrlpV27lMJMePvMDjjY9iH5mk2y1t39FGY7JKFWm32qKkGM8AX428JuhqspGy_dhFycG6eoP2dIToswc6bRvKEtCFw_MyZWENGv_f5vv_n9uJE2jbSxLmKYk8uq7zBEPdmmaNyihdlb-ezbfWDcA9a8dCT5UvUHr6oZDvUl4-APsMRTpUIY8jLjWSzATYeUt6sDi1onCZuuh-TLqgxsKgkORGPX-IVFMTKSae103wAkoWE35O2GQmkcsABBRGIGMwYkbprG-6acJ39ZJGcs7mmWTMJyaSWVrroDs9dzAlXjwszfnHj-NvHu_wXW2Mebu-f4faUIOi1IPz3EjJoFJt2bMPI-yp4bG_M0eGpoue6vfw5SgG_Aq9cl8r1SrZv4_-9CQGRxW6KiPh9hCNwE3E7qvpM0ke2toTJiPW9EDy3Sqc3a_vHEmsDT_R8Dd50J4uXwEBYDKsQ02mdIme73dMW-f4EULNGOVCnkm0sC-PTgcdwODNVPDT3TGqJH9i2t0btZQ_7sd3yDKPiIoYq-9r6f2mpvfDdcObM7tT8DNcS0Oo0nTcIr2QpHpaxwr_dbcVjOOSRs3wifdJmdM8K3jm-Xi_VxfUD5sOnNZ_G9KBdfzIA7ydCzHCDno3GB_cMzK4O_gBfssShpLjsqkom7-tw4w9J3VgTByXGSn9nzU1Ms6gYGwaJNlVvdY1GJ94XbGd1rnqRU=j';
let sdBody = 'p=G6NplMcA3HQU=UuJLysSxHt2CQ_EezejOySuZEGotknxS-AeKb9VVr5WYaUBgR_zAfOe2F2csOpfasefVs1hp-XLtQqcLrohzMelBcwN6Zzo0kuytULvaJOX7uXZlmolKSPUixCMeeX40gHYzgb708uPfi_oMzlfX4xu0WP3MSUCeKwlq2ue550GAkEBuBgPeXZssFlE-f1pvflwfIy2_wRDsdUGhZS0n4hag65NR_bk8cxt5eXYPTOVPaomVpi5l5IFW3Wpn4Jx9CTUEALB8wEgkMLAzb4cF6R1sKBbLTHiVFzoHOLx8fiD_VdL5NMmTcML8g9raNt4OUO6xubSWxcryNiDLZMlKQHxFDEqTEKoz4ewgXGkP98nfjRU_jGJW7C7OP2YlbBrRDKnzhz1F51uzGHioYJDu7eRpzUzduYQapIVQMOtonZhdum3vzlMSGW8gSF9wx2fEwqyUp7w1IomJewVnSMJ0XZzYTJF1OgGkkPmJDe68iwPFWIocPSZSQUrgt-G3P1q1u8QhoU0FNEzHQJc2QgwJ_Vx7v5phfI_VKCqdHbfUL7sQMj_pMvi2oGUqWnly--iVCNCBl7SGn4x8hLzP5hUo4jS0fdEuf8jgKfZVGunsWnRBjPv5VA7cwud8d7dlDdZ6N3PcKP95YvX2x7M_BgmDJcFiGhcwT8gjGwvDR6xIpGaRRLzFy3_fw_xqz2_zumwNara9zOUTPcZINo7bmMz4Tu4k76fL9NNtdfMmavyCW8O3jba7UKCogTnWTqbU5wI3_sQ0NFTXrEefajcW9Xqv9vkRfpmJC-5iVG7Z7h2sICuU5-w1pfk_4ktsGdhX_VazGq42Vkb0K8_VLDmzoxjciIh7uWO_eqPa3KmUJXR0hFUw754hgwOmJeRQPzNsPmzR40naMz5bOdMJcxSpMQ8-x30t9C3xpVPOqKm60_e3YNkUET9hep78EXs7hJx-BmcDMHONzr7dlBaIjtPfRqSuZ97zyWsz2v0qgDsbx5mXXb3KNgmaEKGTtAzXNIiOqOloXRpGedu4Wi0Wnuj9Nl5adGyIGaNxtdeEe6-yl3C6ssruUXuyfPtVW9k8BeoLnekxjpBz3fpQ-E_hRBdkBhH_J26ktAgrKDUMoJhlqhLW8FowO0gv_Rj5SNWBTbK9sETSg';

let syhb_common = 'p=BMIr0L3CWXKI=R6c4pmsQ_ZBojJYxHWeYmaIr2D2cHNaC65Ly49DP8JQQZ5L9oV2KXBfoCrbJahC3aU1ngwi3djXYPr196d_NWB963CUfbPaVVGSHodAWNS1es6HJhqACKCmyP6nFXcWdtcte_-xjDj0wMCjeMXs_3XSuzGyHHn1hgcL55vPplEhi8UoNIA6yndAvA08T7vZbnG1khfYqCdZ-Q474icJ9RTDHsk0eOzciJjocdoy8I2vjVdcGg8n1WZha88NGvzK9AEoV2ZRqe-mzKVtFm4Avu7kTrfJoovgM4VbaCspQFlp3gu-GJkUYi1VdADU0F6JbgJUwY_MjIoyL10c8LdoMYzMrwPm0Oseb1bKUMcdnwiidNT_aEYAMNBAdRjHCHhksZV-9oRfkW7R_SLr2WlyWQZWT0lgoaykqJw35ETe8R7ojXawGn_19Hspti9CEc7GE08aBjtD0r4NBPb_U9AI6xoor4GIbA5B7kWe1pg4pJikf_9aS7gOCihiQHFnA5HP1nKR7JVhQiC4X8Tcyfj3PvnqC8TA4WPWZBiSGLGNibfKInTEHa9ets5pL_n_gCAPhyVEb9-FyJSwbJ-V-XzOngU2KFbmkin6nm6XBjycNfehLmvowL_zXuXBQTle9AOYNu2HuuEOFuqZ6QxkF0PTE-fe99hfTroweA3rTOvMxcwimx7-ft_hGJrCOW0fPS3LhJ-BHop-n8n0xESxeiuChsAlNaeHImHjrO097FzfaMbD86J3scgbZ6EV7rrxs3r_yKIYQkVsn4s_28-5Soy_bgWRhFiQe9PVU7ObnRPczM1tXqQOFcZ8Ik9i-pyKXF74QsZLkHBOUFdPz6Qin5ih9lUyY1KRodVzurmc90DTcYa-vVQX32YS9UWQrGeXJsUqOBJARrlrpTcI1J_28FlP4pROLv2q9abp9b1gy9X8TzfcqvxKGL66ocDeQGNgiY4TFF84SAz7p2DPBR99jXXXu3c7y4ATvNUNeLM0mE5GmrdFeFT9FhIDGjbDB4IXlRz89UCrDunizLvbHhxKvYvRSykYtD1R91zqPG2fhJPw30sIeDEQqddi2ViWjE2EeZmmlBMv-8jLfmweP3thwHrrkctALWlcuBiDAE12Yisew9Zj-J0frYPfN7350ZD-wIDc2QPP_zu4ke7QoyqvbtBmeLw==';

let read20_Prize = 'p=6b9vgm3fvNuU=n8ObWhIWDETjYL3wOqEESKFu4NSPeeUz7gYAdj5T_qFpJ97TF5K3meKN_SpUsZGWbDeCVX5oATNlMDxfIA5-GXYhLnpbezJn28L4J6Hi8VJukO5NFNbxkinCgzEUywFjRTNGb-voczQN6yV5RTbgH1voxo5L8g-VSh1Jpgq4eX6y0jc2QAxSUAzys0M8_W0nmq4oGgMRcMkdPO2xFnGD6N5-YDM_rPYpSjnr2rzdRarQhWkjdmF9j8NHOeoz5l6GUOhNGW1Ox1E4I9Rw7e9KDDEyjeexrLvO9QtC-QTLt4WOL7q9I_YSgB3s8Ms3SLbRLlm2T23K2D84aFnN4dgEO-1egENVN3OHG7UvfsB0pSPs3jKTB4T0eXhP88t5KqHJaZo6NNFj07cGnXpj49vmPxSrdv_nXnrAUM_KG5vaIKaZlr_nk2XcAmUsFONwgxlB1XvUTspOo5oE7aK_6OSdwrq8mMT0g7Cqs4ZvXCLGkymQpdbfWJ_hYzOQhyCv3hy7FvsIkcI2-gUDhpmwfDub6Ddtkwh-SuDXdh2wXwnF9JB6YuhIiQ4Aup1jWGJLY8HcN9W4ztnsEwtg9XcCOeeBsGm0GmajV7G7JU6oZaTC04k8AIVEYw3i77_YRb52-8WK7-et_UusGWjeKo_K2lh5WT9iMsI2OBMKlLEfJWpehrN7pF-h2aUHOc899l-anJTxSZsx6f4ntXmiwgMRGvEsEJmWczaeuLEw9xM_lBb0gzCTsx48ZvSR3pAmIPSIqM2Qo-lh3p3XPFKDp7qL8C2SyMSCgnY-t46QpU279I_aWDKsqfwfZqPznCcgzaAHvFcDhdGV1aG1GiumlfuxiLi8SfwhbfpNSMIw2EBHjfU2PxB586Zy0Tw8VotNKQ4B2fcSui__9ZY-DmymUcEa34idQ_IiGR4RLGSn-wZVU4KzVGVPFD6UL_r5NlckJyGb7CEjbB3T5GaW_YdgUVgL6T864yKdJdahdfjT5Slafcfo8JMHRLwQWZcdJhI52m-1NMq_rINPAqT_0L3gXxqIIJO33Wzz3hfge62SYGKFznjNypyR7RUQmMfdBaima6ExWebQDgH3HtZEnptZ9bEwVv5BM4HQADn1rhc_w4sbkwtM3WAH_ay8PispDHgfFwakeFDYTteVcDzYzsfSFr4OX3Csc8i9KQvfLRyfh';

let video10_Prize = '';

let flsp_Prize = 'p=W7jvhIkVyrvg=NJVCj7xpUhc89Tmu_e_xo75_bhWiKHbWiiflyFj9K9PcPG8atQjBQB2IsUA7zmuvQgqz6s3W7lPRZ3Px_BrvuYllTIq6W2kbAJq3ltg1Yx2CzdCeIJh8sFeRgCa9tHZDucGsYh9LN7iSwTwfQxqx1TljHpN69ic4V5wFVKQUYaeQim9DZle6sPGXmokPWjGnHu-PL0gyyMHt_H1mv1lPwUSgJzKtnkzx0jr1kO4OMozhap41O4C0_DZb4gG3lJcfYvpA36_ixTWovkJ5j3ViAFnyqgfsNPq6jpQWO2QjsdM4A0vU2ACvPsL1mSEPevNOGsjBZly7o3YvQHG31VSekqL_zlc9NGfZ86taW14Xn3j-clRG7urlbTSQLJX-M3to2p70sg1zMUHOqjf6ivSYjjfR9HXK4xs3sbZCWRS3pLkxtB8IVP8m9NdQeMfimaUwmCQwBftCQxZDLXjnj0hEGRWHZprMT8INA3VkLkI4qSB4byDn554E0Hi4xglMyTZWDGFkgAf0KMg0gg_RrF4P8Z5JmUCsb5TgZXLug2om1g7F4QIs-3SR62PW2VkYQnSgn_PCH47DwnhIyi0TxdCSbwsSV0pwvgyaZ5o2F9juoclJK-aW2KM8EOnTLSO1NHpWfHVO-djQXCd4io_k6lHzqyxfxggHzQMUb9KLJ66K1xFIlcR5w2Dk1_3cARs6FRH81WfIvepQyZG6NqywyhNlLHV_PTw_PHgMtqSXKIYbC_-6WagHBPZdsCUk8vEVhh6-Iebad6ZTvD911bnOxhnQN8C435-JRT6M1iCG1ezGzCXlpVezjio7swD5qUTHDqnhEJa8TEs8yumcgXQm9rhh1vz_gE_N1M5BDJKtdhhueGvF8Mo9119rbT6lzcVgHatMNFywI_vKOqWBCRBftEUC8q6AyiNdSubHrV7SktJ82tcRSEftv04tCJQnX9mY5wfMLDmX0MH_AxTVKbLw92i8pXpq4uu-QbhZs7zXFyq3n-eNSQvP7Vce_glv5wqAPsBmdI_U0L9bEEArQ78T69DA-6mcWBuxAvxj87BBlBItrG243myPsMVVlW3I9KTiZkGLDTh_FrJ-xuS0yR7JYGP3lQ9wYpqMxqZeIPfVCMVY9gHdgiLFT333IETtvaxI6RhOhe2JnpDzXjDym2Gf5-VWaInrjtMTZ2R5D4dvsrgUP5yvo_nd0yLjdw==m';

let prize3_body = 'p=a7jvhIkVyrvg=NJVCj7xpUhc89Tmu_e_xo75_bhWiKHbWiiflyFj9K9PcPG8atQjBQB2IsUA7zmuvQgqz6s3W7lPRZ3Px_BrvuYllTIq6W2kbAJq3ltg1Yx2CzdCeIJh8sFeRgCa9tHZDucGsYh9LN7iSwTwfQxqx1TljHpN69ic4V5wFVKQUYaeQim9DZle6sPGXmokPWjGnHu-PL0gyyMHt_H1mv1lPwUSgJzKtnkzx0jr1kO4OMozhap41O4C0_DZb4gG3lJcfYvpA36_ixTWovkJ5j3ViAFnyqgfsNPq6jpQWO2QjsdM4A0vU2ACvPsL1mSEPevNOGsjBZly7o3YvQHG31VSekqL_zlc9NGfZ86taW14Xn3j-clRG7urlbTSQLJX-M3to2p70sg1zMUHOqjf6ivSYjjfR9HXK4xs3sbZCWRS3pLkxtB8IVP8m9NdQeMfimaUwmCQwBftCQxZDLXjnj0hEGRWHZprMT8INAzC5FhsgOnhLraMmVjojtrvpwLEIONVv4qxJoNutw25vC4-eIxSv0jDqdYMUjsTceXQyMGrLLCpcuyHFqQHko3AWG3ugryFTa02cpA4Z-Q1puIQ8yiXT8NIzzD5kqsx8ozcGTk1xp2CpbFrDM9VRTOrCo9Zt9XPsA2oTKtGeclWa9heSl7xtS9BCF4SI1MgMqQyFvwHtDkkbqLCyulhMQRsd7Wc2j5i52n7OIRy5qqA3pqv1P5AcMCWDjBPIUHQ-KvhdybLX98SqCsA5Xj6jP6p2SnUwypsoHkgZ0xZtbOFY4R8fx5LRgmDk4nynzdxQ7ZEvicYqMaFMEiG3R7eN6lKIeXj1s4UZv65dq-RGARsxwxYexs2Oz5eJ4L3TCHV0WVjejxHCJPIKRvtYtfKyfJ9D829i9dZ2sw-AhN18czm2fPYqE76qNXRlUgd1srOfb6lgqoyUdx4UiBVabMnil6oHXbZ6hSN6si6g6X-bYiU61nu68Bvx9oLAEo4UVPy_dFJ-yxJeFPAn_yly3mTqUYsg4pwCL2IM6TnvY0lMI0Wbpsneuz3ZGf33t1DOPf1gz_b24CyD0p1FhPr9KRj-V0jJJr7xAcggIjcE36_sABcqudpBHtiGajOhrz2H6WPkkMiADkO5CdxAYdPut0e0INkqMqOISSVmamCLfPcE3lF_0p9ZGQ_LCw==L',prize6_body = 'p=LMIr0L3CWXKI=-WXrMNbyY3uhrhz3llqtwN28ZCtt0C4FO0Jt_4MLbrG8MRnCrieYedmc6gK3f9DMuzXnQbxOFNtNwraOI5CMn65-WmqYSUiwJ6QJ1eYCHwufOV5YeXTk8InKTRuQvTVePHEI0xgHrbzIbY_c02HbMGIXoozOq24YbNk4zT-KEFBiWWGId9pJwf3rctQUFJZn9PttzERQa3EXUisos6SgcFh1jmiDHIKflrn3F9kmkyY5K-6nxCJpJGCBQErp5-bTHEaTE8R_rDJTx73NgRQhPf87GzwLdj568OR1G-A1lQ0rGTApCpjs5a7fdLu9BnGpQjFKBKJ_FZ8LNMAUx7G47h0w_4O8CcW_42gbxPvEZrjLvg0B0paBxRHZn-B35frdtDEMShHOdYTV_T2x71QR9OMLpL3jOqRUGctpu3FxYe3JXo4FMGuyX4bh11Km4vrzuITIP9AmU4Dds5PT7nG0uzWGBbHxtC_nMtWl4MNNF-LddcUP3zMeGzA1mIYIZvT2-3tynY9jAlEaSuDD-J-NGFJvqjm2AxKe41F1S8ER6fuT1_pA7gqJZX-h1v271tFHlPIUwW7Eb7VYAP-SfqhAMM2dAaHCNx9752NApXf4yBCMvENvCsJCf-9AWL0-2-MV6mxsRMIFYmyLM5Xhq8UBXIDxzhmrR7aDQl569JccJj9LGc_TJZ1uhnhgt_OUk_2us_VnTiUFjJBgbvygsPfrtN9OwthgLzxbF9L3PycxD0FHrnsSDIfST7jAK_YUfCnZ7WuS5CXEf4C3dV4jqQZUUt-dGRWdttUNiO_D3maS1hy4PNAwCoueDNL-dHaVLiQjkA-l9hDf27IIZ_F8YYMqgcoCwtb8tKxgBfVtE9pKxrpMbLN3jmdBAdgEO5jcXPraLdCNMD6Rnhh6gu6UXIGcZZA95jg9AvD9xs_rXtWMCfAGdkjSQiFEIvwqFlFahV_dxwD3FwfR-kuUw6x6eUQpG93Q4O1UeYKveD6QcygI_G17zt328LsqKi7NgLr8CtVwDtbzQlSt-E2TCZcFxuMaBL-GvyvUy6QDPBS7Gbeu0DeuHJbv1k4GCJtEcbiqFK91iTa9ThU2PCJGU61h1x5p56ahYHHUb6rKHJck780ywCGaX37P-WVNj6K5vz0D4I8Z4Kovb-NRDcSbsD0i6ikQcg==';

let scApi = 'user/stay.json',scBody = '';

let share_prize = ''

let kkz_prize = 'p=nWRHEiWXZdUk=P3cEFJNYe4vKCJN66PNA7ILtsZkAE7I7GEud8IclEFiX2_kVM0UczinMt95JFVNwTkFbNmj8_QhP15rv-8Iai-iUBM_TOuHVkGzmLioogdrOTLOmX_SdnlY-vZ7SWP09xb43k4KYkM9WdAkOat1ujftw3UL6ysWvoCF2224t56-Urk2Gmbg6Xo7hWGcMrDdZxjpWDc_JOiH9YVmVGmmvNF6pcc_JSWsdR9fGBpY52h2TTE_DK12dTl_wbgWxLBghN-Ps4qm9svAJonBRuKrfkDsB9ZuwDK5cGpnnK2te0JynLgqd_5dLSqb-FRFQLr67bq0Fp8JYWPRbTI98kkGCjjyZ88d0vmWxxaPT7BEf4tImrWY0lcEQVWGMoAVWNkCgvyKH5EA1AiE6Hlv5lvzVuqrQXmD_gDj_nRwDfhu9Q0T1QDaYXs88npqn4oVd--QhMaqic2a6SX8irmxleffKF-NjedKpNpLQaZxuEUWhF9C2UPFRC6n03pP5QPYCqt4nmveKqqgBYTjeytB07PhyqrLuWvlziEeZ1VgwnRIwfwNWS5az7i7_5UtzZjBKm_om8JfkbMSo5BlGbQ4xezaIjVLj_fWwiWu1-8pF_pMOOoQKfweSHW5UvIozuklGHDFSSBvcGBNkU_Z9jQfs_F-AFvyc4hJELU0Xu2Fh-UWxONyCjveSvnKNwjLxFHePyFYbGyfLjeoNjrOfTb-BpEVEvPwKMS2cM2krQvNKtNDJrXkQXzQ8pIV6hSs0-rg553zT087xJwXyUpUP1ciQZMxg3g-aDJo-0B4xMceV1mZnItpNDFuXHUbyAGcpn1Up1Wi4Hgnczmll6FnFsenFC1mvso6e-U6JzN4TWXXgDq-m-fJibjrn97R7hx7gVwM26g3VsESd4z76m_2MZ4a-MqWRCfnWQZetWt1iVVsXc41x7ENIOJAA6xxCE1tinSNATMlJzK4yTwKlqT2vM_3pcTWPneNjWzSQshQcsB3__tZ9UgH-Apj3wJSEgz3v4MTmQwkZlRDUjMkWiyDo7R7HGBG2fc8N7w1Lc5AU4BblVc1oNzq4zcMz__VMxQrNSRpUNzThg80rRYZV4X5fqc8ZK07j0aXFq6iGN0XWCyqudAaXh_neK0uJxUq9nOiV2h_pMf_-JyVA4u2uvFWL2UqunXa-WALu4_KkUuCw';

let sc_prize = 'p=BMIr0L3CWXKI=-WXrMNbyY3uhrhz3llqtwN28ZCtt0C4FO0Jt_4MLbrG8MRnCrieYedmc6gK3f9DMuzXnQbxOFNtNwraOI5CMn65-WmqYSUiwJ6QJ1eYCHwufOV5YeXTk8InKTRuQvTVePHEI0xgHrbzIbY_c02HbMGIXoozOq24YbNk4zT-KEFBiWWGId9pJwf3rctQUFJZn9PttzERQa3EXUisos6SgcFh1jmiDHIKflrn3F9kmkyY5K-6nxCJpJGCBQErp5-bTHEaTE8R_rDJTx73NgRQhPf87GzwLdj568OR1G-A1lQ0rGTApCpjs5a7fdLu9BnGpQjFKBKJ_FZ8LNMAUx7G47h0w_4O8CcW_42gbxPvEZrjLvg0B0paBxRHZn-B35frdtDEMShHOdYTV_T2x71QR9OMLpL3jOqRUGctpu3FxYe3JXo4FMGuyX4bh11Km4vrzuITIP9AmU4Dds5PT7nG0uzWGBbHxtC_nt5fSBUwgYYeQ76Nc_86HHUFnGOm6yfSBVEpE55a3s8SEZvRJc10jlz5I6c70c6NNVZ0XhycU5vvNbTThMxAabhrpqsFCMfct8c0Z0-zvujTlz4MbNpQERaRi_jbOYhGoSKj3vH0Els3TkHdxXVBzuAa4f3OHEWf-YuxFi-s8qrDQ7OqSN7LtmRciLXOPoSdymvjwnzTB0Sg9ru3utVQ28MWbGCwj0ivC2XbPNW7JldNgukFYhbwggHMWsDc5dNkzFYeh2Wo2G-AnitJrNrX90v5KBkfcJjbxqTpZfe33-p48YaGfESdp6BUsjDBbNjnppRZUBij68JpYpP6WcklvyPtbbR1qJkdUh_XKYDzVD8qi8_u8ukndcDtMnybTubyQaOCaeJ3lbwgHECAUkyh-ne4REyY1Ado-C2FZO9oZb9UkAPQZI4nQLv7N_2qYMWUWZM8HMY3372P-feYgC9EBXb8cVuwF3fD1-Scoi7rCa0M13ouGbqKV1_WJlAnCvyU0_YE9nd9-dilrIk1OsX1TJIa0Bl2ii6m9J5WPmEbmAm7HsnK9kzXeV-JcXOMLzQZMuCcpeQwH_-1ZvjtCy911y4z5QiMbAVUYQX6Tiwic5_fdgYY01yEcN9uRXTRinGSpsfw51VyS-D-TJ_ODuX8588_XuapqGLl34rD_oesHezoe5EgcRVS7ZkpH-HEUGb-0PapBw2mQnCQ=';

let sc_prize2_token = '';

//banner_id_x 里面填入看看赚的文章body，共6个,用 & 连接。
let start_23 = '';
let banner_id_23 = '';
let banner_prize_23 ='';

let start_29 = '';
let banner_id_29 = '';
let banner_prize_29 = '';

let banner_id_42 = '';
let start_42 = '';
let banner_prize_42 = '';

let banner_id_41 = '';
let start_41 = '';
let banner_prize_41 = '';

let start_45 = '';
let banner_id_45 = '';
let banner_prize_45 = ''

let start_44 = '';
let banner_id_44 = '';
let banner_prize_44 = '';

let start_55 = '';
let banner_id_55 = '';
let banner_prize_55 = '';


let bannerStartApi = 'nameless/adlickstart.json',bsaBody = '';
let bannerReadApi = 'nameless/bannerstatus.json',braBody = '';
let bannerEndApi = 'nameless/adlickend.json',beaBody = '';

//醉卧浮生领好礼
const id23 = {"id":23,"start":start_23,"read":banner_id_23,"end":banner_prize_23}
const id29 = {"id":29,"start":start_29,"read":banner_id_29,"end":banner_prize_29}
const id42 = {"id":42,"start":start_42,"read":banner_id_42,"end":banner_prize_42}
const id41 = {"id":41,"start":start_41,"read":banner_id_41,"end":banner_prize_41}
const id45 = {"id":45,"start":start_45,"read":banner_id_45,"end":banner_prize_45}
const id44 = {"id":44,"start":start_44,"read":banner_id_44,"end":banner_prize_44}
const id55 = {"id":55,"start":start_55,"read":banner_id_55,"end":banner_prize_55}

const bannerArr = [id23,id29,id42,id41,id45,id44,id55];

let lotteryApi = 'RotaryTable/toTurnDouble.json';
let lottery_double = 'p=BMIr0L3CWXKI=djuFUVYbIhDvlPsdPmgCLjeGENDUQvusy_JrMOqxMFxSc3ks-SAnX1EulyefoYuek4jamffGPQp2m5IZSOkekbX_nqJDX2FjwHP0hx10UAKuRADLTeNQGkrt_clRgQJN-yCZYUO2w8delO4PF_qBMfVAhqPojb-vUb32bx7M-LzqnF9pfzIxQnq_0jv30K1WKpxg3Ju0le4lHS1NX4t1rR__7LDOrTkiKl-pvRjDTKJRCvUMHD7NQzF7tqJZ_VLSJ2t6odI0pGRCBU5PhYI7xmrIrRTLXR8Ze7YYDsDMYGfJcaU_zPbroAfKOPtnZL7QhojZ7RCx8FdMZ5cMpldd5-XhCHuJLiwPgxhZjrMsPhhIXXiiJ8WC3ntzSu2S1oK3hRWnCd-HspCGsuOlmu0Ha8J_zXbjC2L5wxoWT2Aj8y-YPypyaQi-R2ma5xeSlFXnBQJg42S-hDLn2gZs1yGSh59V1lIi13YGSB_s1NOO-4MHjZf-Wc7gagzWyWWxbnp2n1w2-XoZHQaEWfDoE11NivYGhQ0QuLe-nEPi0UzcA_tptGuJWvp65nnDK8VcSYY1A_1VA4JnrraaNtehWlOFZym3bX1GNsEw_bju5mviXG_bRBP04uuh2HfRYx0-DdfAE4GhfCbBVwZhmBXD7a6dNf12emnb4Du7VtPsWayBq2HHJs3OofJmtYnlWe8T5khVgY4PNSK9J5ztK_K7cvPjyPer02xGgBYkAzpsDAH3Data0p1Wkbh_YHzkGXNx76G5EUjw-u1Z4sAHnqr2_wMzYe-0VX1EHpiY5624RSEnWmvBWRHVBNA5B4I-kN3a7T2ZxBefdQhsgj5aUIOfkutAf_DngJzlHaAVnL19XBAB3Q4HO0K5CGHkD7mYojLZV01KsO5IX8omHC41kUVwng7SneXYfr6zfO-B71LGQTabog0Z4H4YSN5ZjEneAfIAtnicm1fqBUahQpp6p5_rJs5tsUZtDG2xdFi4F2eMRINE89PRgAyKLN07bImN3DA0Fdge_FLzw8bKjkSzJZNeWSwmuycIAXxNC0t53kbbi-Miq_l-Gk0S7fMgOuRKf6P-AjhWaWAw8PxXn9ZdEAdXOzsq21-7ZIhep0bM';

!(async () => {
	if (hour == 0 && minute < 30) {
		await do_login();
	}
	if (minute < 30) {
		await do_syhb(); //首页红包common，每小时一次
		await $.wait(1000)
	}
	if ((hour == 8) || (hour == 10) || (hour == 12) || (hour == 14)){
		await do_sysp(); //首页看视频领金币，每天6次
	}
	if (hour == 9 && minute < 30) {
		await do_sc_prize2()
	}
	await $.wait(1000)	
	await do_tasklist();
	await $.wait(1000)
	if ((hour == 13) || (hour == 14) || (hour == 15) || (hour == 16) || (hour == 17)) {
		for (let n = 0; n < 10; n++) {
			await do_lottery()
			await $.wait(3000)
		}
	}
	await do_userdata();
	//await do_sign(); //签到
	//await do_sdjl(); //时段幸运奖励
	//await do_sdhb(); //计时红包，时段红包
	//await do_sc(); //刷时长
	//await do_flsp() //看福利视频
	//await read_prize(); //领取阅读额外奖励
	//await video_prize(); //领取视频额外奖励
	//await flvideo_prize(); //领取福利视频奖励
	//await do_share_prize(); //领取分享奖励
	//await do_kkz_prize(); //领取完成6次看看赚的奖励
	//await do_sc_prize(); //领取时长奖励
	//await do_prize3(); //领取完成3个任务奖励
	//await do_prize6(); //领取完成6个任务奖励
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

 //tasklist
 function do_tasklist() {
  return new Promise(resolve => {
    $.get(tasklist(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(unescape(data));
			//console.log(`tasklist：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n获取日常任务列表成功，开始检测任务状态 --- `)
				box = result.items.box
				if (box.three.status == 1) {
					await do_prize3();
				} else if (box.six.status == 1) {
					await do_prize6();
				}
				bubble = result.items.bubble
				//console.log(`bubble：${JSON.stringify(bubble)}`)
				for (let n = 0; n < bubble.length; n++) {
					if (bubble[n].sort == 1 && bubble[n].count_down == 0) {
						await do_sdjl(); //时段幸运奖励
						} else if (bubble[n].sort == 2 && bubble[n].count_down == 0) {
							await do_sdhb(); //计时红包,时段红包
						} else if (bubble[n].sort == 3 && bubble[n].count_down == 0) {
							//console.log(`\n${bubble[n].task_name} 数据还没有获取，请去获取！`)
							await do_HourRed();
						}
				}
				daily = result.items.daily
				//console.log(daily)
				for (let m = 0;m < daily.length; m++){
					$.title = daily[m].title
					if(daily[m].status == 2){
						console.log(`\n任务 ${$.title} ${daily[m].but}！`)
					} else if (daily[m].status == 0){
						console.log(`\n任务 ${$.title} 未完成，去执行任务 ---`)
						//banner阅读5个
						for (let s = 0;s < bannerArr.length; s++) {
							$.id = bannerArr[s].id
							$.sbody = bannerArr[s].start
							$.rbody = bannerArr[s].read
							$.ebody = bannerArr[s].end
							if ($.id == daily[m].banner_id) {
								bsaBody = $.sbody
								await bannerStart();
								braBody_1 = $.rbody
								braBody = braBody_1.split("&")
								console.log(`开始执行浏览 ${$.title} ---`)
								for (let n = 0; n < braBody.length; n++) {
									await $.wait(10000)
									await bannerRead();
								}
								beaBody = $.ebody
								await bannerEnd()
							}
						}
						if ($.title === `阅读60分钟`) {
							for (let n = 0; n < 3; n++){
								await do_sc();
								await $.wait(60000)
							}
						}
						if ($.title === `看福利视频`) {
							await do_flsp();
						}
						if ($.title === `转发文章`) {
							await do_fx();
						}
					} else if (daily[m].status == 1){
						console.log(`\n任务 ${$.title} 已完成，去领取奖励 ---`)
						if ($.title === `阅读60分钟`) {
							await do_sc_prize();
						}
						if ($.title === `看福利视频`) {
							await flvideo_prize();
						}
						if ($.title === `阅读文章`) {
							await read_prize();
						}
						if ($.title === `观看视频`) {
							await video_prize();
						}
						if ($.title === `看看赚`) {
							await do_kkz_prize();
						}
						if ($.title === `转发文章`) {
							await do_share_prize();
						}
					}
				}
			} else {
				console.log(`签获取任务列表失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //userdata
function do_userdata() {
  return new Promise(resolve => {
    $.get(userdata(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(unescape(data));
			//console.log(`userdata：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`==========================`)
				console.log(`用户名：${result.items.nickname} \n邀请码：${result.items.invite_code}`)
				console.log(`金币总数：${result.items.score} \n账户状态：${result.items.user_status}`)
				if (result.items.score > 300000) {
					//await do_withdraw()
				}
				console.log(`今日获得金币：${result.items.today_score} \n明日签到金币：${result.items.sign_reward_score}`)
				if (result.items.sign_status == 0) {
					console.log(`今日签到状态：未签到。去执行签到 ---`)
					await do_sign();
				} else if (result.items.sign_status == 1) {
					console.log(`今日签到状态：已签到`)
				}
				if (result.items.msg_notice.is_login == "1") {
					console.log(`登入状态：已登入`)
				} else if (result.items.msg_notice.is_login == "0") {
					console.log(`登入状态：未登入，请重新登入`)
				}
				console.log(`账户余额：${result.items.money_str}`)
			} else {
				console.log(`个人信息获取失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//login
function do_login() {
  return new Promise(resolve => {
    $.post(login(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`登入结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n登入成功！`)
			} else {
				console.log(`\n登入失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//签到
function do_sign() {
  return new Promise(resolve => {
    $.post(basic(basicApi,signBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`签到结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`签到成功，获得 ${result.items.score} 金币！`)
				console.log(`开始执行 ${result.items.button.title} ---`)
				await $.wait(30000);
				await do_sign2();
          } else {
			  console.log(`今日已签到:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

 //签到翻倍
 function do_sign2() {
  return new Promise(resolve => {
    $.post(basic(doubleSignApi,doubleSignBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`签到翻倍结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`签到翻倍成功，获得 ${result.items.score} 金币！ `)
			} else {
				console.log(`签到翻倍失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //时段奖励，每10分钟一次，限6次。
 function do_sdjl() {
  return new Promise(resolve => {
    $.post(basic(basicApi,sdBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`时段奖励成功，获得 ${result.items.score} 金币！ `)
			} else {
				console.log(`时段奖励失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //刷时长
 function do_sc() {
  return new Promise(resolve => {
    $.post(basic(scApi,scBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`刷时长结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`刷入时长成功！`)
			} else {
				console.log(`刷入时长失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //分享
 function do_fx() {
  return new Promise(resolve => {
    $.post(fx(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`分享结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`分享1次成功！`)
			} else {
				console.log(`分享失败:${JSON.stringify(result.message)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //时段红包，每30分钟一次。
 function do_sdhb() {
  return new Promise(resolve => {
    $.post(sdhb(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段红包结果：${JSON.stringify(result)}\n`)
			if (result.code == 1) {
				console.log(`\n时段红包领取成功，获得 ${result.data.score} 金币！`)
			} else {
				console.log(`\n时段红包领取失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //每小时开宝箱。
 function do_HourRed() {
  return new Promise(resolve => {
    $.post(HourRed(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`开宝箱结果：${JSON.stringify(result)}\n`)
			if (result.code == 1) {
				console.log(`\n开宝箱成功，获得 ${result.data.score} 金币！`)
			} else {
				console.log(`\n开宝箱失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//领取首页红包
function do_syhb() {
  return new Promise(resolve => {
    $.post(basic(basicApi,syhb_common), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取首页红包结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n领取首页红包成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`\n领取首页红包失败:${JSON.stringify(result.message)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

 //首页时段视频奖励，每天6次
 function do_sysp() {
  return new Promise(resolve => {
    $.post(sysp(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段红包结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n首页时段激励奖励获取成功，获得 ${result.items.dialog.score} 金币！`)
			} else {
				console.log(`\n首页时段激励奖励获取失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//领取额外阅读奖励
function read_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,read20_Prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取阅读奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取阅读奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取阅读奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取分享奖励
function do_share_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,share_prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取分享奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取分享奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取分享奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取完成看看赚6次奖励
function do_kkz_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,kkz_prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取看看赚奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取看看赚奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取看看赚奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取5分钟时长奖励
function do_sc_prize2() {
  return new Promise(resolve => {
    let options = {
		url: `https://ant.xunsl.com/v17/Ad/getReward.json`,
		headers: {
			'Token': sc_prize2_token,
			'Content-Type': `application/x-www-form-urlencoded`,
			'Host': `ant.xunsl.com`,
			'Connection': `Keep-Alive`,
			'Accept-Encoding': `gzip`,
			'User-Agent': `okhttp/3.12.2`
		},
		body: ``
	};
	$.post(options, async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取5分钟时长奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取5分钟时长奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取5分钟时长奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取60分钟时长奖励
function do_sc_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,sc_prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取60分钟时长奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取60分钟时长奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取60分钟时长奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取额外视频奖励
function video_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,video10_Prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取额外视频奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取额外视频奖励成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取额外视频奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//领取福利视频奖励
function flvideo_prize() {
  return new Promise(resolve => {
    $.post(basic(basicApi,flsp_Prize), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取额外视频奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取福利视频奖励成功，获得 ${result.items.score} 金币！\n`)
          } else {
			  console.log(`领取福利视频奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//完成3个任务奖励
function do_prize3() {
  return new Promise(resolve => {
    $.post(basic(basicApi,prize3_body), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取 完成3个任务奖励 结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取 完成3个任务奖励 成功，获得 ${result.items.score} 金币！\n`)
          } else {
			  console.log(`领取 完成3个任务奖励 失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//完成6个任务奖励
function do_prize6() {
  return new Promise(resolve => {
    $.post(basic(basicApi,prize6_body), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取 完成6个任务奖励 结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取 完成6个任务奖励 成功，获得 ${result.items.score} 金币！\n`)
          } else {
			  console.log(`领取 完成6个任务奖励 失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//看福利视频，每天5次
function do_flsp() {
  return new Promise(resolve => {
    $.get(flsp(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`看福利视频结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`看福利视频成功！`)
          } else {
			  console.log(`看福利视频失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//bannerStart
function bannerStart() {
  return new Promise(resolve => {
    $.post(basic(bannerStartApi,bsaBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`bannerStart：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`激活 ${$.title} 成功，开始浏览 ---`)
				console.log(`开始浏览 ---`)
          } else {
			  console.log(`激活 ${$.title} 失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//bannerRead
function bannerRead() {
  return new Promise(resolve => {
    $.post(basic(bannerReadApi,braBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`bannerRead：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`完成浏览 ${$.title} 1次`)
				//await bannerEnd()
          } else {
			  console.log(`浏览 ${$.title} 失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//bannerEnd
function bannerEnd() {
  return new Promise(resolve => {
    $.post(basic(bannerEndApi,beaBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`bannerEnd：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`浏览 ${$.title} 完成，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`领取 ${$.title} 奖励失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//抽奖
function do_lottery() {
  return new Promise(resolve => {
    $.post(lottery(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`抽奖结果：${JSON.stringify(result)}\n`)
			if (result.status == 1 && result.data.score > 0) {
				console.log(`\n抽奖成功，获得 ${result.data.score} 金币！`)
				console.log(`剩余可抽奖次数：${result.data.remainTurn} 次`)
			} else if (result.status == 1 && result.data.score == 0){
			  console.log(`\n抽奖失败,获得 ${result.data.score} 金币！`)
			  console.log(`剩余可抽奖次数：${result.data.remainTurn} 次`)
			} else {
				console.log(`\n抽奖失败：${JSON.stringify(result)}`)
			}
			if (result.status == 1 && result.data.score > 0 && result.data.doubleMultiple > 0) {
				console.log(`等待28秒开始抽奖翻倍 ---`)
				await $.wait(28300)
				await do_lottery2()
			}
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//抽奖翻倍
function do_lottery2() {
  return new Promise(resolve => {
    $.post(basic(lotteryApi,lottery_double), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`抽奖翻倍结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`抽奖翻倍成功，获得 ${result.items.score} 金币！`)
          } else {
			  console.log(`抽奖翻倍失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

//basic
function basic(api,body) {
  return {
    url: `https://ant.xunsl.com/v5/`+api,
    headers: {
		'request_time': TS,
		'access': `WIFI`,
		'device-platform': `android`,
		'app-version': `8.1.2`,
		'Content-Type': `application/x-www-form-urlencoded`,
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	},
    body: body
  }
}

//share
function fx() {
  return {
    url: `https://ant.xunsl.com/v6/article/share/put.json`,
    headers: {
		'Token': ``,
		'Content-Type': `application/x-www-form-urlencoded`,
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	},
    body: ``
  }
}

//时段红包
function sdhb() {
  return {
    url: `https://ant.xunsl.com/WebApi/TimePacket/getReward`,
    headers: {
      'Referer': 'https://ant.xunsl.com/h5/20200612makeMoney/?access=WIFI&app-version=8.3.2&app_type=jckd&app_version=8.3.2&channel=c4112&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhbKGfJiXrrmyapqGcXY&cookie_id=2678823f1f60456a3e05b92af64a1f33&device_brand=samsung&device_id=7c544a49ba475b24&device_model=SM-A7000&device_platform=android&device_type=android&inner_version=202109081101&mi=0&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&phone_network=WIFI&phone_sim=0&request_time=1634287649&resolution=1080x1920&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&subv=1.2.2&time=1634287640&uid=55072513&uuid=060b4ebaa30b49348028e58fd1aa6122&version_code=832&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhbKGfJiXrrmyapqGcXY&zqkey_id=2678823f1f60456a3e05b92af64a1f33'
	},
    body: ``
  }
}

//每小时开宝箱
function HourRed() {
  return {
    url: `https://ant.xunsl.com/WebApi/invite/openHourRed`,
    headers: {
      'Referer': 'http://ant.xunsl.com/h5/20190410invitefriend/?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.3.2&app_type=jckd&app_version=8.3.2&channel=c4112&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhW6FsoaWsLmuapqGcXY&cookie_id=a72bb970d1c07a2b3b4f807e4d05c357&device_brand=samsung&device_id=7c544a49ba475b24&device_model=SM-A7000&device_platform=android&device_type=android&inner_version=202109081101&mi=0&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&phone_network=WIFI&phone_sim=0&request_time=1634974529&resolution=1080x1920&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&subv=1.2.2&time=1634974529&uid=55072513&uuid=060b4ebaa30b49348028e58fd1aa6122&version_code=832&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhW6FsoaWsLmuapqGcXY&zqkey_id=a72bb970d1c07a2b3b4f807e4d05c357'
	},
    body: ``
  }
}

//看福利视频
function flsp() {
  return {
    url: `https://ant.xunsl.com/V17/NewTask/recordNum.json?access=WIFI&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&channel=c4112&device_brand=samsung&device_id=51840309&device_model=SM-A7000&device_platform=android&device_type=android&dpi=480&inner_version=202109081101&language=zh-CN&memory=1&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&request_time=1634287768&resolution=1080x1920&rom_version=MMB29M.A7000ZCU1CRC2&s_ad=7wQenZDazcfA%3DaF3OFtAfB6gmFvQ6_aOKodPfk-t3zL8j6J&s_im=OqH-4Ui0XDPM%3DfSK22qbYt7RKCmcKICSTaw%3D%3D&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&storage=11.78&subv=1.2.2&uid=55072513&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhbKGfJiXrrmyapqGcXY&zqkey_id=2678823f1f60456a3e05b92af64a1f33&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiJXSUZJIiwiYXBwLXZlcnNpb24iOiI4LjMuMiIsImFwcF9uYW1lIjoiamNrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjguMy4yIiwiY2hhbm5lbCI6ImM0MTEyIiwiZGV2aWNlX2JyYW5kIjoic2Ftc3VuZyIsImRldmljZV9pZCI6IjUxODQwMzA5IiwiZGV2aWNlX21vZGVsIjoiU00tQTcwMDAiLCJkZXZpY2VfcGxhdGZvcm0iOiJhbmRyb2lkIiwiZGV2aWNlX3R5cGUiOiJhbmRyb2lkIiwiZHBpIjoiNDgwIiwiaW5uZXJfdmVyc2lvbiI6IjIwMjEwOTA4MTEwMSIsImxhbmd1YWdlIjoiemgtQ04iLCJtZW1vcnkiOiIxIiwibWkiOiIwIiwibW9iaWxlX3R5cGUiOiIxIiwibmV0X3R5cGUiOiIxIiwibmV0d29ya190eXBlIjoiV0lGSSIsIm9wZW51ZGlkIjoiN2M1NDRhNDliYTQ3NWIyNCIsIm9zX2FwaSI6IjIzIiwib3NfdmVyc2lvbiI6Ik1NQjI5TS5BNzAwMFpDVTFDUkMyIiwicmVxdWVzdF90aW1lIjoiMTYzNDI4Nzc2OCIsInJlc29sdXRpb24iOiIxMDgweDE5MjAiLCJyb21fdmVyc2lvbiI6Ik1NQjI5TS5BNzAwMFpDVTFDUkMyIiwic19hZCI6Ijd3UWVuWkRhemNmQSUzRGFGM09GdEFmQjZnbUZ2UTZfYU9Lb2RQZmstdDN6TDhqNkoiLCJzX2ltIjoiT3FILTRVaTBYRFBNJTNEZlNLMjJxYll0N1JLQ21jS0lDU1RhdyUzRCUzRCIsInNpbSI6IjIiLCJzbV9kZXZpY2VfaWQiOiIyMDIxMDkxMzE5MTM0ODc3OGUwOTZlMjIzMGE4ZDZmNjA0ODMxMjZjMThiNjk2MDEzYjI0NjYxNmQ2NDIwMCIsInN0b3JhZ2UiOiIxMS43OCIsInN1YnYiOiIxLjIuMiIsInVpZCI6IjU1MDcyNTEzIiwidmVyc2lvbl9jb2RlIjoiODMyIiwienFrZXkiOiJNREF3TURBd01EQXdNSkNNcE4tdzA5V3RnNS1CYjM2ZWg2Q1BxSHVhbEllamw2LUZwV1d3ellteGhMS3A0TERQeUdsOW9ucWtqM1pxWUphOFk4OThuYWpXc0p1cFpMRGRoYktHZkppWHJybXlhcHFHY1hZIiwienFrZXlfaWQiOiIyNjc4ODIzZjFmNjA0NTZhM2UwNWI5MmFmNjRhMWYzMyJ9.B_kRPDw2DyHekG-emdOPCLTm1rFHn_hIeeQG0BN4wX_vtANfMb3yOnIN7lvDluDNKoBfNDx3hVqIZzVmvzjGAw`,
    headers: {

	}
  }
}

//首页视频奖励
function sysp() {
  return {
    url: `https://ant.xunsl.com/v17/Rvideo/videoCallback.json`,
    headers: {

	},
    body: `access=WIFI&action=right_corner_video&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&channel=c4112&device_brand=samsung&device_id=51840309&device_model=SM-A7000&device_platform=android&device_type=android&dpi=480&inner_version=202109081101&language=zh-CN&memory=1&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&request_time=1634974330&resolution=1080x1920&rom_version=MMB29M.A7000ZCU1CRC2&s_ad=0CWzFwAroTSg%3DosCkCVDV8YC3kyknXZo3ZuEE4O4E4pW9pV&s_im=swQenZDazcfA%3DSjCf9b9QanOYf-d_rczLHQ%3D%3Dpf&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&storage=11.78&subv=1.2.2&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiJXSUZJIiwiYWN0aW9uIjoicmlnaHRfY29ybmVyX3ZpZGVvIiwiYXBwLXZlcnNpb24iOiI4LjMuMiIsImFwcF9uYW1lIjoiamNrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjguMy4yIiwiY2hhbm5lbCI6ImM0MTEyIiwiZGV2aWNlX2JyYW5kIjoic2Ftc3VuZyIsImRldmljZV9pZCI6IjUxODQwMzA5IiwiZGV2aWNlX21vZGVsIjoiU00tQTcwMDAiLCJkZXZpY2VfcGxhdGZvcm0iOiJhbmRyb2lkIiwiZGV2aWNlX3R5cGUiOiJhbmRyb2lkIiwiZHBpIjoiNDgwIiwiaW5uZXJfdmVyc2lvbiI6IjIwMjEwOTA4MTEwMSIsImxhbmd1YWdlIjoiemgtQ04iLCJtZW1vcnkiOiIxIiwibWkiOiIwIiwibW9iaWxlX3R5cGUiOiIxIiwibmV0X3R5cGUiOiIxIiwibmV0d29ya190eXBlIjoiV0lGSSIsIm9wZW51ZGlkIjoiN2M1NDRhNDliYTQ3NWIyNCIsIm9zX2FwaSI6IjIzIiwib3NfdmVyc2lvbiI6Ik1NQjI5TS5BNzAwMFpDVTFDUkMyIiwicmVxdWVzdF90aW1lIjoiMTYzNDk3NDMzMCIsInJlc29sdXRpb24iOiIxMDgweDE5MjAiLCJyb21fdmVyc2lvbiI6Ik1NQjI5TS5BNzAwMFpDVTFDUkMyIiwic19hZCI6IjBDV3pGd0Fyb1RTZyUzRG9zQ2tDVkRWOFlDM2t5a25YWm8zWnVFRTRPNEU0cFc5cFYiLCJzX2ltIjoic3dRZW5aRGF6Y2ZBJTNEU2pDZjliOVFhbk9ZZi1kX3JjekxIUSUzRCUzRHBmIiwic2ltIjoiMiIsInNtX2RldmljZV9pZCI6IjIwMjEwOTEzMTkxMzQ4Nzc4ZTA5NmUyMjMwYThkNmY2MDQ4MzEyNmMxOGI2OTYwMTNiMjQ2NjE2ZDY0MjAwIiwic3RvcmFnZSI6IjExLjc4Iiwic3VidiI6IjEuMi4yIiwidWlkIjoiNTUwNzI1MTMiLCJ2ZXJzaW9uX2NvZGUiOiI4MzIiLCJ6cWtleSI6Ik1EQXdNREF3TURBd01KQ01wTi13MDlXdGc1LUJiMzZlaDZDUHFIdWFsSWVqbDYtRnBXV3d6WW14aExLcDRMRFB5R2w5b25xa2ozWnFZSmE4WTg5OG5haldzSnVwWkxEZGhXNkZzb2JmcjdtaWFwcUdjWFkiLCJ6cWtleV9pZCI6IjI5ZjE3YTkzNmUyZGU2ZmFjMDRmOGE0MmM5YzdmNDg5In0.0Kx4HX4FP5Q3CXzWuzfkIoQoMltxBKUGwYorL4AxlKXYO9no68KK3r9J-MST_hMIJYSLJMAXGcijp_UTSldsww&uid=55072513&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhW6Fsobfr7miapqGcXY&zqkey_id=29f17a936e2de6fac04f8a42c9c7f489`
  }
}

//tasklist
function tasklist() {
  return {
    url: `https://ant.xunsl.com/v17/NewTask/getTaskList.json?access=WIFI&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&channel=c4112&device_brand=samsung&device_id=51840309&device_model=SM-A7000&device_platform=android&device_type=android&dpi=480&inner_version=202109081101&language=zh-CN&memory=1&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&request_time=1634287627&resolution=1080x1920&rom_version=MMB29M.A7000ZCU1CRC2&s_ad=nWRHEiWXZdUk%3DgX33z9oTnhRUYtxpJkb7yLYYfIGYSs3K&s_im=Jb9vgm3fvNuU%3DMmfO6o0p2ThpseOj9iq2lA%3D%3Dw&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&storage=11.78&subv=1.2.2&uid=55072513&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhbKGfJiXrrmyapqGcXY&zqkey_id=2678823f1f60456a3e05b92af64a1f33&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiJXSUZJIiwiYXBwLXZlcnNpb24iOiI4LjMuMiIsImFwcF9uYW1lIjoiamNrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjguMy4yIiwiY2hhbm5lbCI6ImM0MTEyIiwiZGV2aWNlX2JyYW5kIjoic2Ftc3VuZyIsImRldmljZV9pZCI6IjUxODQwMzA5IiwiZGV2aWNlX21vZGVsIjoiU00tQTcwMDAiLCJkZXZpY2VfcGxhdGZvcm0iOiJhbmRyb2lkIiwiZGV2aWNlX3R5cGUiOiJhbmRyb2lkIiwiZHBpIjoiNDgwIiwiaW5uZXJfdmVyc2lvbiI6IjIwMjEwOTA4MTEwMSIsImxhbmd1YWdlIjoiemgtQ04iLCJtZW1vcnkiOiIxIiwibWkiOiIwIiwibW9iaWxlX3R5cGUiOiIxIiwibmV0X3R5cGUiOiIxIiwibmV0d29ya190eXBlIjoiV0lGSSIsIm9wZW51ZGlkIjoiN2M1NDRhNDliYTQ3NWIyNCIsIm9zX2FwaSI6IjIzIiwib3NfdmVyc2lvbiI6Ik1NQjI5TS5BNzAwMFpDVTFDUkMyIiwicmVxdWVzdF90aW1lIjoiMTYzNDI4NzYyNyIsInJlc29sdXRpb24iOiIxMDgweDE5MjAiLCJyb21fdmVyc2lvbiI6Ik1NQjI5TS5BNzAwMFpDVTFDUkMyIiwic19hZCI6Im5XUkhFaVdYWmRVayUzRGdYMzN6OW9UbmhSVVl0eHBKa2I3eUxZWWZJR1lTczNLIiwic19pbSI6IkpiOXZnbTNmdk51VSUzRE1tZk82bzBwMlRocHNlT2o5aXEybEElM0QlM0R3Iiwic2ltIjoiMiIsInNtX2RldmljZV9pZCI6IjIwMjEwOTEzMTkxMzQ4Nzc4ZTA5NmUyMjMwYThkNmY2MDQ4MzEyNmMxOGI2OTYwMTNiMjQ2NjE2ZDY0MjAwIiwic3RvcmFnZSI6IjExLjc4Iiwic3VidiI6IjEuMi4yIiwidWlkIjoiNTUwNzI1MTMiLCJ2ZXJzaW9uX2NvZGUiOiI4MzIiLCJ6cWtleSI6Ik1EQXdNREF3TURBd01KQ01wTi13MDlXdGc1LUJiMzZlaDZDUHFIdWFsSWVqbDYtRnBXV3d6WW14aExLcDRMRFB5R2w5b25xa2ozWnFZSmE4WTg5OG5haldzSnVwWkxEZGhiS0dmSmlYcnJteWFwcUdjWFkiLCJ6cWtleV9pZCI6IjI2Nzg4MjNmMWY2MDQ1NmEzZTA1YjkyYWY2NGExZjMzIn0.LEus4CrEf5ZxeizRfWzVV21PHmtip0PAsxG6GFbodFoiFc3tXUEmLbc5CFgji7CRNgnKz1z9cEAhM-dVYsQsJw`,
	headers: {
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	}
  }
}

//start
function login() {
  return {
    url: `https://ant.xunsl.com/v6/count/start.json`,
    headers: {

	},
	body: `access=WIFI&androidid=7c544a49ba475b24&app-version=8.3.2&app_name=jckd_app&app_version=8.3.2&channel=c4112&device_brand=samsung&device_id=51840309&device_model=SM-A7000&device_platform=android&device_type=android&dpi=480&imei=359881065406118&inner_version=202109081101&language=zh-CN&memory=1&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&request_time=1634287511&resolution=1080x1920&rom_version=MMB29M.A7000ZCU1CRC2&s_ad=tMIr0L3CWXKI%3D6ESLa_Ew1ZDHjNsmW9JqzLsTuaVvAMbk&s_im=iwQenZDazcfA%3DSjCf9b9QanOYf-d_rczLHQ%3D%3DSx&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&storage=11.78&subv=1.2.2&token=98347e1fcf34115989f1e2252ecb9d76&uid=55072513&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhbKEopyZrt_EapqGcXY&zqkey_id=efc7560162bca7d4d1c9f976c51cadb8`
  }
}


//userdata
function userdata() {
  return {
    url: `https://ant.xunsl.com/v3/user/userinfo.json?access=WIFI&app_name=jckd_app&app_version=8.3.2&channel=c4112&device_brand=samsung&device_id=51840309&device_model=SM-A7000&device_platform=android&device_type=android&dpi=480&inner_version=202109081101&language=zh-CN&memory=1&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&phone_sim=2&request_time=1634228731&resolution=1080x1920&rom_version=MMB29M.A7000ZCU1CRC2&s_ad=jMIr0L3CWXKI%3D6ESLa_Ew1ZDHjNsmW9JqzLsTuaVvAMbk&s_im=DCWzFwAroTSg%3DaOTxr61Nef7HY65aJaHrTg%3D%3Dpk&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&storage=11.78&uid=55072513&version_code=832&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhbKEjI6bsLm2apqGcXY&zqkey_id=7262b9f38048cca610fca458526fe869&sign=ab2f9daeb75bfe4be822b036be7cb476`,
    headers: {
		'Host': `ant.xunsl.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	}
  }
}

//抽奖
function lottery() {
  return {
    url: `https://ant.xunsl.com/WebApi/RotaryTable/turnRotary?_=${TS}`,
    headers: {
      "Referer": `https://ant.xunsl.com/html/rotaryTable/index.html?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.3.2&app_type=jckd&app_version=8.3.2&channel=c4112&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhW6EjJzerrmqapqGcXY&cookie_id=5e51c7ff49860d589a1bbc976b9c093b&device_brand=samsung&device_id=7c544a49ba475b24&device_model=SM-A7000&device_platform=android&device_type=android&inner_version=202109081101&mi=0&openudid=7c544a49ba475b24&os_api=23&os_version=MMB29M.A7000ZCU1CRC2&phone_network=WIFI&phone_sim=0&request_time=1634918185&resolution=1080x1920&sim=2&sm_device_id=20210913191348778e096e2230a8d6f60483126c18b696013b246616d64200&subv=1.2.2&time=1634918185&uid=55072513&uuid=060b4ebaa30b49348028e58fd1aa6122&version_code=832&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FpWWwzYmxhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdhW6EjJzerrmqapqGcXY&zqkey_id=5e51c7ff49860d589a1bbc976b9c093b`
	},
    body: ``
  }
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            }
                : t;
            let s = this.get;
            return "POST" === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s)
                    })
                })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t,
                this.http = new s(this),
                this.data = null,
                this.dataFile = "box.dat",
                this.logs = [],
                this.isMute = !1,
                this.isNeedRewrite = !1,
                this.logSeparator = "\n",
                this.startTime = (new Date).getTime(),
                Object.assign(this, e),
                this.log(`\n${this.name}\u811a\u672c,\u5f00\u59cb\u6267\u884c:`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t))
                } catch { }
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20,
                    r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"),
                    a = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: "cron",
                            timeout: r
                        },
                        headers: {
                            "X-Key": o,
                            Accept: "*/*"
                        }
                    };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode())
                return {}; {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i)
                    return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r)
                    return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            } else
                s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"),
                this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
                this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
                t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => { })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.get(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                        e(t, s, i)
                })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            this.ckjar.setCookieSync(s, null),
                                e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
        }
        post(t, e = (() => { })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
                this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.post(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                        e(t, s, i)
                });
            else if (this.isQuanX())
                t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n")),
                this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}\u811a\u672c, \u6267\u884c\u7ed3\u675f! \u7528\u65f6${s}\u79d2`),
                this.log(),
                (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }
        (t, e)
}
