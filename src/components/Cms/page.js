export default {
  'page_title': 'page',
  'menu_title': 'page',
  'template': 'homepage',
  'content': [
    {
      'section': {
        children: [
          {
            'header': {
              'settings': {
                type: 'h1'
              },
              'content': 'HEADER H1'
            }
          },
          {
            'header': {
              'settings': {
                type: 'h2'
              },
              'content': 'HEADER H2'
            }
          },
          {
            'header': {
              'settings': {
                type: 'h3'
              },
              'content': 'HEADER H3'
            }
          },
          {
            'header': {
              'settings': {
                type: 'h4'
              },
              'content': 'HEADER H4'
            }
          },
          {
            'header': {
              'settings': {
                type: 'h5'
              },
              'content': 'HEADER H5'
            }
          },
          {
            'row': {
              'settings': {},
              'children': [
                {
                  'col': {
                    'settings': {
                      'md': 12
                    },
                    'children': [
                      {
                        'rte': {
                          'settings': {},
                          'content': '<p>RTE DATA</p>'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {'rte': {content: '<h1>HOI!!!</h1><p>Pinokkio</p>'}}
        ]
      }
    }
  ]
};
