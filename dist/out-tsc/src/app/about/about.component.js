import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AboutComponent = class AboutComponent {
    constructor(router, unleashService) {
        this.router = router;
        this.unleashService = unleashService;
    }
    navigateToPage(page) {
        this.selectedPage = page;
        page = '/' + page;
        this.router.navigate([page]);
    }
    ngOnInit() {
        this.unleashService.changeTheme('dark');
        this.science = require('../../assets/images/science-journal-logo.png');
        this.semanticScholar = require('../../assets/images/scholar-logo.png');
        this.pnas = require('../../assets/images/pnas-logo.png');
        console.log(this.background);
        this.researchPapers = [{
                title: 'Reducing the Racial Achievement Gap: A Social-Psychological Intervention',
                subtitle: 'Geoffrey L. Cohen et al.',
                link: 'http://www-inst.eecs.berkeley.edu/~cs375/fa13/cs375/Science-2006-Cohen-1307-10.pdf',
                img: this.science,
                // tslint:disable-next-line: max-line-length
                content: 'Two randomized field experiments tested a social-psychological intervention designed to improve minority student performance and increase our understanding of how psychological threat mediates performance in chronically evaluative real-world environments.'
            },
            {
                title: 'Recursive Processes in Self-Affirmation: Intervening to Close the Minority Achievement Gap',
                subtitle: 'Geoffrey L. Cohen et al.',
                img: this.science,
                link: 'https://ed.stanford.edu/sites/default/files/recursive_processes_final_science.pdf',
                // tslint:disable-next-line: max-line-length
                content: 'A 2-year follow-up of a randomized field experiment previously reported in Science is presented. A subtle intervention to lessen minority students’ psychological threat related to being negatively stereotyped in school was tested in an experiment conducted three times with three independent cohorts.'
            },
            {
                title: 'Self-affirmation facilitates minority middle schoolers’ progress along college trajectories',
                subtitle: 'J. Parker Goyer, Geoffrey L. Cohen et al.',
                img: this.pnas,
                link: 'https://www.pnas.org/content/pnas/114/29/7594.full.pdf',
                // tslint:disable-next-line: max-line-length
                content: 'Small but timely experiences can have long-term benefits when their psychological effects interact with institutional processes. In a follow- up of two randomized field experiments, a brief values affirmation intervention designed to buffer minority middle schoolers against the threat of negative stereotypes had long-term benefits on college- relevant outcomes.'
            },
            {
                title: 'The Psychology of Change: Self-Affirmation and Social Psychological Intervention',
                subtitle: 'Geoffrey L. Cohen and David K. Sherman',
                img: this.semanticScholar,
                link: 'https://pdfs.semanticscholar.org/7fe3/234bd35d814caed6e3cf43a3f3ed76ecd6e2.pdf',
                // tslint:disable-next-line: max-line-length
                content: 'People have a basic need to maintain the integrity of the self, a global sense of personal adequacy. Events that threaten self-integrity arouse stress and self-protective defenses that can hamper performance and growth. However, an intervention known as self-affirmation can curb these negative outcomes.'
            }
        ];
    }
};
AboutComponent = tslib_1.__decorate([
    Component({
        selector: 'app-about',
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.css']
    })
], AboutComponent);
export { AboutComponent };
//# sourceMappingURL=about.component.js.map