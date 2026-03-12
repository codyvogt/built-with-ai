// ===== Case Study Application Form Handler =====

document.addEventListener('DOMContentLoaded', () => {
    initCaseStudyForm();
});

function initCaseStudyForm() {
    const form = document.getElementById('caseStudyForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('caseStudySubmitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const formData = new FormData(form);
            
            // Build email content
            const name = formData.get('name');
            const role = formData.get('role');
            const email = formData.get('email');
            const phone = formData.get('phone') || 'Not provided';
            const business = formData.get('business');
            const website = formData.get('website') || 'Not provided';
            const businessDesc = formData.get('business_description');
            const problem = formData.get('problem');
            const solutionIdea = formData.get('solution_idea');
            const currentTools = formData.get('current_tools') || 'Not provided';
            const impact = formData.get('impact');
            const timeline = formData.get('timeline');
            const additionalInfo = formData.get('additional_info') || 'None';
            
            const subject = encodeURIComponent('🎯 CASE STUDY APPLICATION: ' + business + ' - ' + name);
            const body = encodeURIComponent(
                '======================================\n' +
                'CASE STUDY APPLICATION\n' +
                'Regina SK Campaign\n' +
                '======================================\n\n' +
                'CONTACT INFORMATION\n' +
                '-------------------\n' +
                'Name: ' + name + '\n' +
                'Role: ' + role + '\n' +
                'Email: ' + email + '\n' +
                'Phone: ' + phone + '\n\n' +
                'BUSINESS INFORMATION\n' +
                '--------------------\n' +
                'Business Name: ' + business + '\n' +
                'Website: ' + website + '\n' +
                'Description: ' + businessDesc + '\n\n' +
                'PROJECT DETAILS\n' +
                '---------------\n' +
                'Problem to Solve:\n' + problem + '\n\n' +
                'Solution Idea:\n' + solutionIdea + '\n\n' +
                'Current Tools: ' + currentTools + '\n\n' +
                'Expected Impact:\n' + impact + '\n\n' +
                'Timeline: ' + timeline + '\n\n' +
                'Additional Info:\n' + additionalInfo + '\n\n' +
                '-------------------\n' +
                'Case study consent: AGREED\n' +
                '======================================\n'
            );
            
            // Open mailto
            window.location.href = 'mailto:info@builtwithai.ca?subject=' + subject + '&body=' + body;
            
            // Show success after brief delay
            setTimeout(() => {
                form.reset();
                document.getElementById('successModal').classList.add('active');
            }, 500);

        } catch (error) {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please email us directly at info@builtwithai.ca');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}
