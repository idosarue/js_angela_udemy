$(document).ready( () => {
    $('#delete-button').click( (e) => {
        $target = $(e.target)
        const id = $target.attr('data-id')
        if (confirm('Are you sure you want to delete this post?')){
            $.ajax({
                type: 'DELETE',
                url: '/deletePost/' + id,
                success : (response) => {
                    window.location.href = '/'
                },
                error : (err) => {
                    console.log(err, 'eror')
                }
            })
        }

    })
})
