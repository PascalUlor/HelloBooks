import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collection, CollectionItem, Icon, Preloader } from 'react-materialize';
import swal from 'sweetalert2';
import { editCategoryAction } from '../../../actions/admin/editCategory';
import { deleteCategoryAction } from '../../../actions/admin/deleteCategory';

/**
 * @description renders the Categories Collection list
 *
 * @class CategoriesCollection
 *
 * @extends {React.Component}
 */
class CategoriesCollectionList extends React.Component {
  /**
   * *
   * @param {object} props
   *
   * @memberof CategoriesCollection
   *
   *
   */
  constructor(props) {
    super(props);
    this.editCategory = this
      .editCategory
      .bind(this);
    this.deleteCategory = this
      .deleteCategory
      .bind(this);
  }

  /**
  *
  *
  * @param {object} id - categoryId
  *
  * @memberof CategoriesCollectionList
  *
  * @returns {function} function
  */
  editCategory(id) {
    swal({
      title: 'Enter new Category Name',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: categoryName => new Promise((resolve) => {
        setTimeout(() => {
          resolve(categoryName);
        }, 2000);
      }),
      allowOutsideClick: false
    }).then((categoryName) => {
      this.props.editCategoryAction({ categoryName }, id)
        .then((response) => {
          if (response.message === 'Category Modified!') {
            swal({
              type: 'success',
              title: 'Category Update',
              html: 'Category has been updated'
            });
          }
        });
    });
  }

  /**
   * @param {integer} id - Category id
   *
   * @returns {function} deleteCategory
   *
   * @memberOf CategoriesCollectionList
   */
  deleteCategory(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      buttonsStyling: true,
      reverseButtons: true
    }).then(() => {
      this.props.deleteCategoryAction(id)
        .then((response) => {
          if (response.message === "This category has been deleted") {
            swal(
              'Deleted!',
              'Your Category has been deleted.',
              'success'
            );
          } else {
            swal(
              'Cancelled',
              'This Category has books in it',
              'error'
            );
          }
        })
        .catch(() => {
          swal(
            'Operation Cancelled',
            'Category is safe from deletion',
            'error'
          );
        });
    }).catch(() => {});
  }
  /**
   *
   *
   * @returns {Component} Component
   *
   * @memberof CategoriesCollection
   */
  render() {
    if (!this.props.categories) {
      return <Preloader size="big" className="center-align" />;
    }
    const categoryNames = this
      .props
      .categories
      .map(category => (
        <CollectionItem
          key={category.id}
          value={category.id}

        >
          <div className="black-text">
            {category.categoryName}
            <span className="right">
              <Link
                to="#"
                className="waves-effect"
                onClick={() => this.editCategory(category.id)}
              >
                <Icon small className="icons">edit</Icon>
              </Link>
              <Link
                to="#"
                className="waves-effect "
                onClick={() => this.deleteCategory(category.id)}
              >
                <Icon small className="icons">delete</Icon>
              </Link>
            </span>
          </div>
        </CollectionItem>
      ));
    return (
      <Collection>
        {[...categoryNames]}
      </Collection>
    );
  }
}

CategoriesCollectionList.defaultProps = {
  editCategoryAction: null,
  deleteCategoryAction: null
};

CategoriesCollectionList.propTypes = {
  categories: PropTypes
    .arrayOf(PropTypes.shape({ map: PropTypes.object }))
    .isRequired,
  editCategoryAction: PropTypes.func,
  deleteCategoryAction: PropTypes.func
};

const mapStateToProps = ({ categoryReducer }) =>
  ({
    categories: categoryReducer.categoryList
  });

export default connect(mapStateToProps, {
  editCategoryAction,
  deleteCategoryAction
})(CategoriesCollectionList);
