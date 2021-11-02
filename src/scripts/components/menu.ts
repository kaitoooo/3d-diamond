import { gsap } from 'gsap';

export default class Menu {
    elms: {
        [s: string]: HTMLElement;
    };
    links: NodeListOf<HTMLElement>;
    addClass: string;

    constructor() {
        this.elms = {
            canvas: document.querySelector('[data-canvas]'),
            parent: document.querySelector('[data-header="parent"]'),
            bg: document.querySelector('[data-header="bg"]'),
        };
        this.links = document.querySelectorAll('[data-header="link"]');
        this.addClass = 'is-active';

        this.init();
    }
    init(): void {
        this.elms.canvas.addEventListener('click', (e: any) => {
            e.preventDefault();
            this.toggle();
        });
        this.elms.bg.addEventListener('click', (e: any) => {
            e.preventDefault();
            this.toggle();
        });
    }
    toggle(): void {
        gsap.config({
            force3D: true,
        });
        const tl = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.6,
                ease: 'power2.easeOut',
            },
        });
        if (this.elms.parent.classList.contains(this.addClass)) {
            // 閉じる
            tl.to(this.elms.bg, {
                duration: 0.2,
                visibility: 'hidden',
                opacity: 0,
            });
            tl.to(this.elms.parent, {
                duration: 0.3,
                left: '-100%',
            });
            tl.to(this.links, {
                y: '-40px',
                opacity: 0,
            });
            tl.play();
            this.elms.parent.classList.remove(this.addClass);
        } else {
            // 開く
            this.elms.parent.classList.add(this.addClass);
            tl.to(this.elms.bg, {
                duration: 0.3,
                visibility: 'visible',
                opacity: 1,
            });
            tl.to(this.elms.parent, {
                duration: 0.4,
                left: 0,
            });
            tl.to(this.links, {
                stagger: 0.08,
                y: 0,
                opacity: 1,
            });
            tl.play();
        }
    }
}
