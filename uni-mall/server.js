const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

app.use(cors()); // 使用 cors 中间件
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'static')));

app.post('/platform-framework/api/auth/login', (req, res) => {
    const { mobile, code } = req.body;

    // 模拟验证码检查
    if (code === '1234') { // 假设正确的验证码是1234
        res.json({
            errno: 0,
            errmsg: '成功',
            data: {
                token: 'mock-token', // 返回一个模拟的token
                mobile: mobile
            }
        });
    } else {
        res.json({
            errno: 1,
            errmsg: '验证码错误'
        });
    }
});

app.post('/platform-framework/api/smscode', (req, res) => {
    const { phone } = req.body;

    // 模拟发送短信验证码逻辑
    if (phone) {
        res.json({
            errno: 0,
            errmsg: '成功',
            data: {
                code: '1234' // 模拟返回验证码
            }
        });
    } else {
        res.json({
            errno: 1,
            errmsg: '手机号错误'
        });
    }
});


// Catalog data
const catalogListData = {
    categoryList: [
        { id: 1, name: '全部' },
        { id: 2, name: '苹果' },
        { id: 3, name: '华为' },
        { id: 4, name: 'VIVO' },
        { id: 5, name: 'OPPO' },
        { id: 6, name: '魅族' },
        { id: 7, name: '小米' },
        { id: 8, name: '三星' },
    ],
    currentCategory: {
        id: 1,
        name: '全部',
        wapBannerUrl: 'http://localhost:3000/static/images/轮播图1.png',
        subCategoryList: [
            { id: 101, name: '小米', wapBannerUrl: 'http://localhost:3000/static/images/小米1.png', marketPrice: 5399, price: 503 },
            { id: 102, name: '小米11', wapBannerUrl: 'http://localhost:3000/static/images/小米1.png', marketPrice: 5399, price: 503 }
        ]
    }
};

// Current category data
const currentCategoryData = {
    1: {
        id: 1,
        name: '全部',
        wapBannerUrl: 'http://localhost:3000/static/images/轮播图1.png',
        subCategoryList: [
            { id: 101, name: '小米', wapBannerUrl: 'http://localhost:3000/static/images/小米1.png', marketPrice: 5399, price: 503 },
            { id: 102, name: '小米12', wapBannerUrl: 'http://localhost:3000/static/images/小米1.png', marketPrice: 5399, price: 503 }
        ]
    },
    2: {
        id: 2,
        name: '苹果',
        wapBannerUrl: 'http://localhost:3000/static/images/轮播图2.png',
        subCategoryList: [
            { id: 201, name: 'IPhone5', wapBannerUrl: 'http://localhost:3000/static/images/苹果14.png', marketPrice: 5399, price: 503 },
            { id: 202, name: 'IPhone6', wapBannerUrl: 'http://localhost:3000/static/images/苹果14.png', marketPrice: 5399, price: 503 }
        ]
    },
    // 其他分类的数据...
};

// Index page data
const indexPageData = {
    newGoods: [
        { id: 1, name: '新品1', listPicUrl: '/static/images/新品1.png', retailPrice: 499 },
        { id: 2, name: '新品2', listPicUrl: '/static/images/新品2.png', retailPrice: 599 }
    ],
    hotGoods: [
        {
            id: 1,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top1.png',
            iconUrl: 'http://localhost:3000/static/images/三只鸭.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },
          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },          {
            id: 2,
            name: '贝尔易购',
            toplabel:'http://localhost:3000/static/images/top2.png',
            iconUrl: 'http://localhost:3000/static/images/蓝熊.png',
            tags: ['全新平台', '先享后付', '22以上'],
            desc: '已租2008+',
          },
    ],
    topics: [
        { id: 1,
            scenePicUrl: 'http://localhost:3000/static/images/蓝熊.png',
            title: '花分贷款', 
         },  { 
            id: 2,
            scenePicUrl: 'http://localhost:3000/static/images/蓝熊.png',
            title: '贝尔易购', 
          },  
          { id: 3,
            scenePicUrl: 'http://localhost:3000/static/images/蓝熊.png',
            title: '三只鸭商城', 
         },  { 
            id: 4,
            scenePicUrl: 'http://localhost:3000/static/images/蓝熊.png',
            title: '优借宝', 
          },  
    ],
    brands: [
        { id: 1, name: '品牌1', listPicUrl: '/static/images/品牌1.png' },
        { id: 2, name: '品牌2', listPicUrl: '/static/images/品牌2.png' }
    ],
    floorGoods: [
        {
            id: 1, name: '信用平台1', goodsList: [
                { id: 101, name: '店铺1', listPicUrl: '/static/images/店铺1.png', retailPrice: 999 },
                { id: 102, name: '店铺2', listPicUrl: '/static/images/店铺2.png', retailPrice: 1099 }
            ]
        },
        {
            id: 2, name: '信用平台2', goodsList: [
                { id: 201, name: '店铺3', listPicUrl: '/static/images/店铺3.png', retailPrice: 1199 },
                { id: 202, name: '店铺4', listPicUrl: '/static/images/店铺4.png', retailPrice: 1299 }
            ]
        }
    ],
    banner: [
        { id: 1, imageUrl: 'http://localhost:3000/static/images/轮播图1.png', link: '/pages/goods/goods?id=1' },
        { id: 2, imageUrl: 'http://localhost:3000/static/images/轮播图2.png', link: '/pages/goods/goods?id=2' }
    ],
    channel: [
        { id: 1, name: '频道1', iconUrl: '/static/images/频道1.png', url: '/pages/channel/channel?id=1' },
        { id: 2, name: '频道2', iconUrl: '/static/images/频道2.png', url: '/pages/channel/channel?id=2' }
    ]
};

// API endpoints
app.get('/platform-framework/api/catalog/index', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: catalogListData
    });
});

app.get('/platform-framework/api/catalog/current', (req, res) => {
    const id = req.query.id;
    const data = currentCategoryData[id];
    if (data) {
        res.json({
            errno: 0,
            errmsg: '成功',
            data: {
                currentCategory: data
            }
        });
    } else {
        res.status(404).json({
            errno: 1,
            errmsg: '机型不存在'
        });
    }
});

app.get('/platform-framework/api/index/newGoods', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { newGoodsList: indexPageData.newGoods }
    });
});

app.get('/platform-framework/api/index/hotGoods', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { hotGoodsList: indexPageData.hotGoods }
    });
});

app.get('/platform-framework/api/index/topic', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { topicList: indexPageData.topics }
    });
});

app.get('/platform-framework/api/index/brand', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { brandList: indexPageData.brands }
    });
});

app.get('/platform-framework/api/index/category', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { categoryList: indexPageData.floorGoods }
    });
});

app.get('/platform-framework/api/index/banner', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { banner: indexPageData.banner }
    });
});

app.get('/platform-framework/api/index/channel', (req, res) => {
    res.json({
        errno: 0,
        errmsg: '成功',
        data: { channel: indexPageData.channel }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
