<template>
    <header class="header">
        <div class="container">
            <div class="left">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>

            <div class="right">
                <a href="#">Đăng nhập</a>
                <a href="#">Đăng ký</a>
            </div>

            <div class="mobile-menu" @click="toggleMenu">
                ☰
            </div>
        </div>

        <div class="mobile-dropdown" v-if="isOpen">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>

<style scoped>
.header {
    width: 100%;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ccc;
    padding: 10px;
}

.container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left a,
.right a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
}

.mobile-menu {
    display: none;
    font-size: 24px;
    cursor: pointer;
}

.mobile-dropdown {
    display: none;
    flex-direction: column;
    background: #fff;
    border-top: 1px solid #ccc;
    padding: 10px;
}

.mobile-dropdown a {
    margin: 5px 0;
    color: #333;
    text-decoration: none;
}

/* Responsive */
@media (max-width: 768px) {

    .left,
    .right {
        display: none;
    }

    .mobile-menu {
        display: block;
    }

    .mobile-dropdown {
        display: flex;
    }
}
</style>
